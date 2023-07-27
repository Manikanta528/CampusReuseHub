import Header from "../components/Header";
import { PLP } from "../utilities/routes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toster ,{ Toaster } from "react-hot-toast";
import { storage , db , auth } from "../utilities/firebase";
import { ref , uploadBytes} from "firebase/storage";
import { uid } from "uid";
import { addDoc, collection } from "firebase/firestore"; 


const AddProductPage = () => {
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({
        productName : "",
        productDescription : "",
        productPhoto : null,
        collageName : "",
        city : "",
        state : "",
        country : "",
        postalCode : "",
        productPrice : 0,
    } as {
        productName : string,
        productDescription : string,
        productPhoto : null | File,
        collageName : string,
        city : string,
        state : string,
        country : string,
        postalCode : string,
        productPrice : number,
    });

    const uploadData = (productID: string, productDetails: {
      productName : string,
      productDescription : string,
      productPhoto : null | File,
      collageName : string,
      city : string,
      state : string,
      country : string,
      postalCode : string,
      productPrice : number,
    }) => {
      const {
        productName,
        productDescription,
        productPhoto,
        collageName,
        city,
        state,
        country,
        postalCode,
        productPrice,
      } = productDetails;
    
      const storageRef = ref(storage, `products/${productID}`);
      uploadBytes(storageRef, productPhoto).then(() => {
        console.log('Uploaded a blob or file!');
      }).then(() => {
        const productsCollectionRef = collection(db, "products");
        addDoc(productsCollectionRef, {
          uid : productID,
          productName : productName,
          productDescription : productDescription,
          productPhoto : `products/${productID}`,
          collageName : collageName,
          city : city,
          state : state,
          country : country,
          postalCode : postalCode,
          productPrice : productPrice,
          timestamp : Date.now(),
          sellerID : auth.currentUser?.uid,
        })
      })
    
      
    }

    function addProductHandler(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log(productDetails);
        const {
            productName,
            productDescription,
            productPhoto,
            collageName,
            city,
            state,
            country,
            postalCode,
            productPrice,
          } = productDetails;
        
          if (!productName || productName.trim() === "") {
            toster.error("Product name is required!");
            return;
          }
        
          if (!productDescription || productDescription.trim() === "") {
            toster.error("Product description is required!");
            return;
          }
        
          if (!productPhoto) {
            toster.error("Product photo is required!");
            return;
          }
        
          if (!collageName || collageName.trim() === "") {
            toster.error("Collage name is required!");
            return;
          }
        
          if (!city || city.trim() === "") {
            toster.error("City is required!");
            return;
          }
        
          if (!state || state.trim() === "") {
            toster.error("State is required!");
            return;
          }
        
          if (!country || country.trim() === "") {
            toster.error("Country is required!");
            return;
          }
          const isValidPostalCode = /^\d{6}$/.test(postalCode);

          if (!isValidPostalCode) {
            toster.error("Invalid postal code! Please enter a 6-digit PIN code.");
            return false;
          }

          if(!productPrice || productPrice < 0){
            toster.error("Product price is required!");
            return;
          }
          const productID = uid(16);

          uploadData(productID, productDetails);
          toster.success("Product added successfully!");
          setTimeout(() => {
            navigate(PLP);
          }, 1000);         
    }


  return (
    <div className="bg-white">
      <div className="opacity-80 bg-background-pattern bg-26  h-fit">
        <Header />
        <Toaster/>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <form className="p-12">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add Product
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label
                    htmlFor="product-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                      <input
                        type="text"
                        name="product-name"
                        id="product-name"
                        autoComplete="product-name"
                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter product name"
                        onChange={(e) => {
                            setProductDetails({
                                ...productDetails,
                                productName : e.target.value,
                            });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="product-price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                      <input
                        type="number"
                        name="product-price"
                        id="product-price"
                        autoComplete="product-price"
                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter product price"
                        onChange={(e) => {
                            setProductDetails({
                                ...productDetails,
                                productPrice : parseInt(e.target.value),
                            });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full px-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      onChange={(e) => {
                        setProductDetails({
                            ...productDetails,
                            productDescription : e.target.value,
                        });
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about the product.
                  </p>
                </div>

                

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Add Product photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => {
                                setProductDetails({
                                    ...productDetails,
                                    productPhoto : e.target.files[0],
                                });
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Campus Details
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use collage address where you want exchange the product.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                
                <div className="col-span-full">
                  <label
                    htmlFor="collage-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Collage Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="collage-name"
                      id="collage-name"
                      autoComplete="collage-name"
                      className="block w-full px-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                            setProductDetails({
                                ...productDetails,
                                collageName : e.target.value,
                            }); 
                        }}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full px-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                            setProductDetails({
                                ...productDetails,
                                city : e.target.value,
                            });
                        }}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full px-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                            setProductDetails({
                                ...productDetails,
                                state : e.target.value,
                            });
                        }}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full px-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                            setProductDetails({
                                ...productDetails,
                                postalCode : e.target.value,
                            });
                        }}
                    />
                  </div>
                  
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md px-2.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setProductDetails({
                            ...productDetails,
                            country : e.target.value,
                        });
                      }}
                    /> 
                    
                  </div>
                </div>
            </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => navigate(PLP)}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={addProductHandler}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
