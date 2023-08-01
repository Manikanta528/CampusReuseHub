import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CgCalendarDates } from "react-icons/cg";
import { AiTwotoneCrown } from "react-icons/ai";

import { db, storage } from "../utilities/firebase";
import {
  getDocs,
  query,
  where,
  collection,
  DocumentData,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Header from "../components/Header";
import { PLP } from "../utilities/routes";


const ProductDescriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //console.log(id);
  const [product, setProduct] = useState({} as DocumentData);
  const [productImage, setProductImage] = useState("");

  const [productDate, setProductDate] = useState("Loading...");
  const [productSeller, setProductSeller] = useState({} as DocumentData);
  const [productNotFound, setProductNotFound] = useState(false);

  useEffect(() => {
    // fetch product data from firestore
    const q = query(collection(db, "products"), where("uid", "==", id));
    getDocs(q)
      .then((querySnapShot) => {
        //console.log(querySnapShot.docs[0].data());
        const product = querySnapShot.docs[0].data();
        setProduct(product);
        //console.log(product);
        const date = new Date(product.timestamp as number);
        setProductDate(date.toDateString());
      })
      .catch(() => {
        //console.log(error);
        setProductNotFound(true);
        return;
      });

    // fetch product image from storage
    const storageRef = ref(storage, `products/${id}`);
    getDownloadURL(storageRef).then((url) => {
      setProductImage(url);
    });
  }, []);

  useEffect(() => {
    // fetch product seller data from firestore using uid
    if(product.sellerID){
      const q = query(collection(db, "users"), where("uid", "==", product.sellerID));
      getDocs(q)
        .then((querySnapShot) => {
          //console.log(querySnapShot.docs[0].data());
          const seller = querySnapShot.docs[0].data();
          setProductSeller(seller);
        })
    }
  }, [product]);

  return (
    <div className="bg-white">
      <Header />
      {!productNotFound ? (
        <div className=" px-6 py-4  sm:py-8 sm:px-12">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className=" flex max-w-2xl items-center space-x-2 lg:max-w-7xl "
            >
              <li className="text-sm">
                Products /
                <span
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {" " + product.productName}
                </span>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className=" gap-8 flex justify-between flex-wrap lg:flex-nowrap mt-6 max-full ">
            <div>
              {productImage ? (
                <img
                  src={productImage}
                  alt={product.productName}
                  className="h-full w-screen rounded-2xl object-cover object-center "
                />
              ) : (
                <div className="animate-pulse flex items-center justify-center h-full w-auto rounded-md border-2">
                  <div className="h-full w-full text-center rounded-md ">
                    <img src="https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=1380" />
                  </div>
                </div>
              )}
            </div>
            <div className="border-2 border-indigo-400 px-8 py-8 rounded-lg ">
              <img
                src="https://img.freepik.com/free-photo/3d-render-online-payment-transaction-security_107791-16637.jpg?w=1380&t=st=1690779301~exp=1690779901~hmac=7923497df99d1c68f7dabd6b95f6f2725b2587f814b2359b6a9405b20ac800aa"
                alt="product-safe-transaction"
                width={250}
                height={250}
                className="object-cover object-center hidden lg:block"
              />
              <h3 className="text-lg font-semibold text-indigo-600">
                Arrange a Suitable Meeting Place
              </h3>
              <li className="mt-2 text-gray-600">
                Coordinate with the buyer to decide on a convenient location
                within the campus or any convenient place for the transaction.
              </li>
              <li className="mt-1 text-gray-600">
                Meeting in a public and well-lit area on campus is recommended
                for safety and convenience.
              </li>

              {/* Complete the transaction */}
              <h3 className="mt-4 text-lg font-semibold text-indigo-600">
                Complete the Transaction
              </h3>
              <li className="mt-2 text-gray-600">
                Once you and the buyer have agreed upon the details, proceed
                with the purchase at the designated meeting place.
              </li>
            </div>
          </div>

          {/* Product info */}
          { product.productName && <div className="py-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.productName}
              </h1>
              {productDate && (
                <p className=" flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <CgCalendarDates className="inline" />
                  <span>{productDate} </span>
                </p>
              )}
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ₹ {product.productPrice}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <AiTwotoneCrown className="inline" />{" "}
                <span>Seller : {productSeller.name}</span>
              </p>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Chat with seller
              </button>
            </div>

            <div className="pt-6 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200  lg:pr-8 ">
              {/* Description and location details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description :</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900/50">
                    {product.productDescription}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-semibold text-gray-900 mb-2">
                  Location Details
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.collageName}</p>
                  <span className="text-sm text-gray-600">
                    {product.state}, {product.city}, {product.country},{" "}
                    {product.postalCode}
                  </span>
                </div>
              </div>
            </div>
          </div>}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-4  sm:py-8 sm:px-12">
          <img
            src="../assets/productNotFound.svg"
            alt="product-not-found"
            className=" object-cover object-center "
            width={500}
            height={500}
          />
          <p className=" font-medium text-2xl text-gray-600 p-2 rounded-lg ">
            Product Not Found
          </p>
          <p className=" text-gray-400 pb-2 rounded-lg ">
            Oops! Looks like you followed a bad link. Please check the product
            link and try again.
          </p>
          <button
            onClick={() => {
              navigate(PLP);
            }}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to Product Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionPage;
