import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db, storage } from "../utilities/firebase";
import { getDocs, query, where, collection, DocumentData} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const ProductDescriptionPage = () => {
  const { id } = useParams();
  //console.log(id);
  const [product, setProduct] = useState({} as DocumentData)
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    // fetch product data from firestore
    const q = query(collection(db, "products"), where("uid", "==", id));
    getDocs(q).then((querySnapShot) => {
      console.log(querySnapShot.docs[0].data());
      setProduct(querySnapShot.docs[0].data());
    });
    // fetch product image from storage
    const storageRef = ref(storage, `products/${id}`);
    getDownloadURL(storageRef).then((url) => {
      setProductImage(url);
    });

  }, []);
  return <div>
    {JSON.stringify(product)}
    <img src={productImage} alt="" loading="lazy" />
  </div>;
};

export default ProductDescriptionPage;
