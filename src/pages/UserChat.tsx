import ChatTextComponent from "../components/ChatTextComponent";
import Header from "../components/Header";
import smallLogo from "../assets/small-logo.svg";

import { useState, useEffect, useRef } from "react";
import {auth, db } from "../utilities/firebase";
import {collection, getDocs, query, where, getDoc, doc, setDoc, DocumentData} from "firebase/firestore";

import PopUp from "../components/PopUp";
import { useLocation } from "react-router-dom";
import ChatProfileComponent from "../components/ChatProfileComponent";



const UserChat = () => {
  const { state } = useLocation();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [receiver, setReceiver] = useState(state?.receiverId);
  const [sender, setSender] = useState(state?.senderId);
  const [showPopUp, setShowPopUp] = useState(false);
  const [chats, setChats] = useState<DocumentData[]>([]);
  const [chatProfile, setChatProfile] = useState<string[]>([]);



  const handleMessage = () => {
    if (message.length <= 0) return;
    let chatId : string;
    if(sender < receiver){
      chatId = sender + receiver;
    }else{
      chatId = receiver + sender;
    }
    console.log(chatId, sender, receiver);
    const chatRef = doc(db, "chats", chatId);
    getDoc(chatRef).then((querySnapshot) => {
      console.log(querySnapshot);
       if(querySnapshot.exists()){
        const data = querySnapshot.data()
        const arr = data.messages;
        console.log(arr);
        arr.push({text : message , time : new Date(), sentBy : sender});
        setDoc(chatRef, 
          {
            messages : arr,
            ...data
          }
        ).then(() => {
          setChat(arr);
          setMessageSent(prev => !prev)
        })
      }
    })
    setMessage("");  
  }

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chat]);

 
  useEffect(() => {
    // to fetch user chat with specific receiver id if exists else create new chat
    if(!sender || !receiver) return;
    let chatId : string;
    if(sender < receiver){
      chatId = sender + receiver;
    }else{
      chatId = receiver + sender;
    }
    const chatRef = doc(db, "chats", chatId);

    getDoc(chatRef).then((querySnapshot) => {
      console.log(querySnapshot);
       if(querySnapshot.exists()){
        const data = querySnapshot.data();
        console.log(data.messages);
        setChat(data.messages);
        
      }else{
        const q = query(collection(db, "users"), where("uid", "==", sender));
        getDocs(q).then((querySnapShot) => {
            const user = querySnapShot.docs[0].data();
            setChatProfile(prev => [ ...prev , user.name]); 
          })
          const q2 = query(collection(db, "users"), where("uid", "==", receiver));
          getDocs(q2).then((querySnapShot) => {
            const user = querySnapShot.docs[0].data();
            setChatProfile(prev => [ ...prev , user.name]); 
          })

        setDoc(chatRef,
          {
            messages : [],
            u1 : sender,
            u2 : receiver,
            u1Name : chatProfile[0],
            u2Name : chatProfile[1],
          }
        )
      }
    }
    );
  }, [messageSent]);

  useEffect(() => {
    // to fetch user chat profiles of chat 
    if(!sender || !receiver) return;
    const usersRef = collection(db, "chats");
    const  q = query(usersRef, where("u1", "==", sender));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(chats.length == 0){
           setChats([data])
          }
        else {
          chats.forEach((item : DocumentData) => {
            if(item.u1 === data.u1 && item.u2 === data.u2 ) return;
            else {
              setChats(prev => [...prev, data]);
              console.log(chats);
            }
          })
        }
      });
    });
    const  q2 = query(usersRef, where("u2", "==", sender));
    getDocs(q2).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(chats.length == 0) setChats([data])
        else {
          chats.forEach((item) => {
            if(item.u1 === data.u1 && item.u2 === item.u2) return;
            else{
              setChats(prev => [...prev, data]);
            }
          })
        }
      });
    });

  }, []);

  useEffect(() => {
    // auth state change listener
    if (auth) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setSender(user.uid);
        } else {
          setShowPopUp(true);
        }
      });
    }
  });


  return (
    <div  >
      <Header />
      {showPopUp && <PopUp/>}
      
      <div className="flex h-[calc(100vh-56px)] antialiased text-gray-800" >
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <img src={smallLogo} />
              </div>
              <div className="ml-2 font-bold text-2xl">Messaging</div>
            </div>

            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold"> Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  {/* chat count */}
                  {chats.length}
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
                
                {chats.map((item,i) =>{
                  const { u1Name ,u1 , u2 , u2Name } = item;
                  const chatProfile = u1 == sender ? {name : u2Name , id : u2} : {name : u1Name , id : u1};
                  return(<ChatProfileComponent key={i} data={chatProfile}/>)
                } )}
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2" id="current">
                    {/* ChatTextComponent is used here */}
                    {chat.map((item,i) =>{
                      const { text , time , sentBy } = item;
                      return(
                      <ChatTextComponent
                        key={i}
                        message={text}
                        time = {time}
                        isReceiver={sentBy == receiver ? true : false}
                      />
                    )}
                    )}
                    <div ref={bottomRef} />
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" 
                  onClick={handleMessage}>
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
