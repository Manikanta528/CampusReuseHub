import { auth, db, storage } from "../utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MinIdentityIcon from "../components/MinIdentityIcon";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { HOME } from "../utilities/routes";
import Header from "../components/Header";

export async function getUserData(uid: string): Promise<DocumentData> {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(() => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data().name);
  });
  return querySnapshot.docs[0].data();
}

const Profile = () => {
  const [user, setUser] = useState({} as DocumentData);
  const [sinceMember, setSinceMember] = useState("");
  const [products, setProducts] = useState([] as DocumentData[]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid).then((data) => {
          setUser(data);
          const date = new Date(data.timestamp);
          setSinceMember(date.toDateString());
          //console.log(data);
        });
      } else {
        toast.error("Not Logged In");
        navigate(HOME);
      }
    });
  }, []);

  useEffect(() => {
    const docsRef = collection(db, "products");
    const q = query(docsRef, where("sellerID", "==", user.uid || ""));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        //console.log(product);
        const storageRef = ref(storage, `products/${product.uid}`);
        getDownloadURL(storageRef).then((url) => {
          product.productUrl = url;
          setProducts((prev) => [...prev, product]);
        });
        //console.log(products);
      });
    });
  }, [user]);
  return (
    <div className="bg-gray-100 min-h-screen max-h-fit pb-12">
      <div>
        <Toaster />
        <Header />
      </div>
      <div className="px-6 sm:px-14">
        <h1 className=" py-4  sm:py-8  font-medium text-lg capitalize">
          Profile
        </h1>
        {user && (
          <div className="w-full  flex flex-col md:flex-row  gap-12">
            {/* Profile Card */}
            <div className="bg-white block md:sticky top-8 md:w-1/3 h-fit p-3 border-t-4 border-indigo-600">
              <div className="image overflow-hidden">
                {user.name && (
                  <div >
                    <span className="relative flex h-3 w-3 left-6 top-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                    <MinIdentityIcon
                      username={user.name}
                      lightness="60"
                      saturation="50"
                      width="40"
                      height="40"
                      
                    />
                  </div>
                )}
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user.name}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {user.email}
              </h3>

             {user.name &&  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Logged In
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since </span>&nbsp;&nbsp;&nbsp;
                  <span className="ml-auto">{sinceMember}</span>
                </li>
              </ul>}
            </div>
            {/* End of profile card */}
            {/* Your products Card */}
            <div className="bg-white w-full md:w-2/3 p-3 border-t-4 border-black">
              <h1 className=" py-4 px-4 sm:py-8  font-medium text-lg capitalize">
                Your Products
              </h1>
              <div>
                {products && products.length === 0 && (
                  <div className="flex items-center justify-center">
                    <h1 className="text-base sm:text-2xl font-medium text-gray-400">
                      {" "}
                      No Products{" "}
                    </h1>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-x-6 p-4 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-4 min-w-full">
                {products.map((product) => (
                  <a
                    key={product.uid}
                    href={`/product/${product.uid}`}
                    className="group border-[1px] p-4 rounded-xl hover:border-indigo-200 hover:shadow-xl active:bg-slate-100"
                  >
                    <div className=" flex items-center justify-center w-full overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={product.productUrl}
                        alt={product.productName}
                        className="h-64 w-full  object-cover "
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.productName}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                      ₹ {product.productPrice}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
