import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../utilities/firebase";
import { collection, getDocs } from "firebase/firestore";
import { storage } from "../utilities/firebase";
import { ref, getDownloadURL } from "firebase/storage";

const ProductListingPage = () => {
  const [products, setProducts] = useState(
    [] as ({
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
    }| DocumentData)[]
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
        console.log(products);
      });
    });
  }, []);
  console.log(products);
  return (
    <div>
      <NavBar isHomePage={false} />
      <div className="bg-white">
        <h1 className="px-6 py-4  sm:py-8 sm:px-12 font-medium text-lg capitalize">
          Campus Reuse Hub - Product Listing
        </h1>
        <div className="mx-auto max-w-2xl px-6 py-4 sm:px-12 sm:py-8 lg:max-w-7xl ">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.uid} href={`/product/${product.uid}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.productUrl}
                    alt={product.productName}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.productName}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.productPrice}
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
