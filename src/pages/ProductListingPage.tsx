import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../utilities/firebase";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { storage } from "../utilities/firebase";
import { ref, getDownloadURL } from "firebase/storage";

const ProductListingPage = () => {
  const [products, setProducts] = useState(
    [] as (
      | {
          city: string;
          collageName: string;
          country: string;
          postalCode: string;
          productDescription: string;
          productName: string;
          productPhoto: string;
          productPrice: number;
          sellerID: string;
          state: string;
          timestamp: number;
          uid: string;
          productUrl: string;
        }
      | DocumentData
    )[]
  );

  useEffect(() => {
    const docsRef = collection(db, "products");
    getDocs(docsRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const storageRef = ref(storage, `products/${product.uid}`);
        getDownloadURL(storageRef).then((url) => {
          product.productUrl = url;
          setProducts((prev) => [...prev, product]);
        });
        //console.log(products);
      });
    });
  }, []);
  //console.log(products);
  return (
    <div>
      <NavBar isHomePage={false} />
      <div className="bg-white">
        <h1 className="px-6 py-4  sm:py-8 sm:px-12 font-medium text-lg capitalize">
          Campus Reuse Hub - Product Listing
        </h1>
        <div className="mx-auto max-w-2xl px-6 py-4 sm:px-12 sm:py-8 lg:max-w-7xl ">
          <h2 className="sr-only">Products</h2>
          <div>
            {products.length == 0 && (
              <div className="flex items-center justify-center">
                <h1 className="text-base sm:text-2xl font-medium text-gray-400">
                  {" "}
                  Loading...{" "}
                </h1>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
    </div>
  );
};

export default ProductListingPage;
