import { auth ,db} from "../utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect , useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import MinIdentityIcon from "../components/MinIdentityIcon";
import { collection, query, where, getDocs } from "firebase/firestore";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { HOME } from "../utilities/routes";

export async function  getUserData(uid : string): Promise<string> {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().name);
    
  });
  return querySnapshot.docs[0].data().name;
}

const Profile = () => {
  const [user, setUser] = useState("Unknown User");
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid).then((name : string) => {
          setUser(name);
        });
      } else {
        toast.error("Not Logged In");
        navigate(HOME)
      }
    });
  }, []);
  return (
  <>
    <div>
      <Toaster/>
      <NavBar isHomePage={false}/>
    </div>
    <h1>Profile</h1>
    {user != "Unknown User" && <MinIdentityIcon username={user} lightness="60" saturation="50" width="40" height="40" />}
    {user}
  </>
  );
};

export default Profile;
