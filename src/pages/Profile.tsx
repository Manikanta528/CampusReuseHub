import { useEffect , useState} from "react";
import { auth ,db} from "../utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import MinIdentityIcon from "../components/MinIdentityIcon";
import { collection, query, where, getDocs } from "firebase/firestore";
import NavBar from "../components/NavBar";



const Profile = () => {
  const [user, setUser] = useState("Unknown User");
  
  async function getUserData(uid : string) {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().name);
      setUser(doc.data().name);
    });
  }
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        toast.success("Logged In Successfully");
        getUserData(uid);
      } else {
        toast.error("Not Logged In");
      }
    });
  }, []);
  return (
  <>
    <Toaster
    position="top-center"
    />
    <div>
      <NavBar/>
    </div>
    <h1>Profile</h1>
    {user != "Unknown User" && <MinIdentityIcon username={user} lightness="60" saturation="50" width="40" height="40" />}
    {user}
  </>
  );
};

export default Profile;
