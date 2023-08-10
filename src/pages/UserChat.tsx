import ChatTextComponent from "../components/ChatTextComponent";
import Header from "../components/Header";
import smallLogo from "../assets/small-logo.svg";

import { useState, useEffect, useRef } from "react";
import { auth, db } from "../utilities/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  DocumentData,
} from "firebase/firestore";

import PopUp from "../components/PopUp";
import { Link, useLocation } from "react-router-dom";
import ChatProfileComponent from "../components/ChatProfileComponent";

const UserChat = () => {
  const { state } = useLocation();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [receiver, setReceiver] = useState(state?.receiverId);
  const [sender, setSender] = useState(
    state?.senderId || auth.currentUser?.uid
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const [chats, setChats] = useState<DocumentData[]>([]);

  const handleMessage = () => {
    if (message.length <= 0) return;
    let chatId: string;
    if (sender < receiver) {
      chatId = sender + receiver;
    } else {
      chatId = receiver + sender;
    }
    //console.log(chatId, sender, receiver);
    const chatRef = doc(db, "chats", chatId);
    getDoc(chatRef).then((querySnapshot) => {
      //console.log(querySnapshot);
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        const arr = data.messages;
        //console.log(arr);
        arr.push({ text: message, time: new Date(), sentBy: sender });
        setDoc(chatRef, {
          messages: arr,
          ...data,
        }).then(() => {
          setChat(arr);
          setMessageSent((prev) => !prev);
        });
      }
    });
    setMessage("");
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    // to fetch user chat with specific receiver id if exists else create new chat
    if (!sender || !receiver) return;
    let chatId: string;
    if (sender < receiver) {
      chatId = sender + receiver;
    } else {
      chatId = receiver + sender;
    }
    const chatRef = doc(db, "chats", chatId);
    getDoc(chatRef).then((querySnapshot) => {
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        setChat(data.messages);
      } else {
        const q = query(collection(db, "users"), where("uid", "==", sender));
        getDocs(q).then((querySnapShot) => {
          const user = querySnapShot.docs[0].data();
          const q2 = query(collection(db, "users"), where("uid", "==", receiver));
        getDocs(q2).then((querySnapShot) => {
          const user2 = querySnapShot.docs[0].data();
          
          const initialChat = {
            messages: [],
            u1: sender,
            u2: receiver,
            u1Name: user.name,
            u2Name: user2.name,
          };
          //console.log(initialChat);
          setDoc(chatRef, initialChat)
            .then(() => {
              setChat(initialChat.messages);
              setMessageSent((prev) => !prev);
            })
            .catch((error) => {
              console.log(error);
            });
          setChats((prev) => {
            const arr = [initialChat, ...prev];
            return arr;
          });
        });
        });
        
        //console.log(initialChat);
      }
    });
  }, [messageSent]);

  useEffect(() => {
    // to fetch user chat profiles of chat
    if (!sender) return;
    const usersRef = collection(db, "chats");
    const q = query(usersRef, where("u1", "==", sender));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setChats((prev) => [...prev, data]);
      });
    });
    const q2 = query(usersRef, where("u2", "==", sender));
    getDocs(q2).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setChats((prev) => [...prev, data]);
      });
    });
  }, [sender]);

  useEffect(() => {
    // auth state change listener
    if (auth) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setSender(user.uid);
          //setReceiver(state?.receiverId);
        } else {
          setShowPopUp(true);
        }
      });
    }
  }, []);

  return (
    <div>
      <Header />
      {showPopUp && <PopUp />}

      <div className="flex h-[calc(100vh-56px)] antialiased text-gray-800 border-t-2">
        <div className="flex flex-col sm:flex-row h-full w-full overflow-x-hidden">
          <div className="flex sm:flex-col pt-8  pl-8 sm:pl-6  pr-6 w-full sm:w-fit overflow-scroll bg-white flex-shrink-0 ">
            <div className="hidden sm:flex flex-row items-center justify-start h-12 w-full ">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <img src={smallLogo} />
              </div>
              <div className="ml-2 font-bold text-2xl">Messaging</div>
            </div>

            <div className="sm:flex flex-col sm:mt-8 mt-4">
              <div className="sticky flex flex-row items-center justify-start sm:justify-between gap-12 text-xs">
                <span className="font-bold"> Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  {/* chat count */}
                  {chats.length}
                </span>
              </div>
              <div className="flex flex-row sm:flex-col gap-1 space-y-1 mt-4 -mx-2 h-12 sm:h-[512px] overflow-scroll  ">
                {chats.map((item, i) => {
                  const { u1Name, u1, u2, u2Name } = item;
                  const chatProfile =
                    u1 == sender
                      ? { name: u2Name, id: u2 }
                      : { name: u1Name, id: u1 };
                  return (
                    <ChatProfileComponent
                      key={i}
                      data={chatProfile}
                      isCurrent={receiver == chatProfile.id}
                      onClickChangeChatUserProfile={() => {
                        setReceiver(chatProfile.id);
                        setMessageSent((prev) => !prev);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-[calc(100%-200px)] sm:h-full p-6  border-l-2">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2" id="current">
                    {/* ChatTextComponent is used here */}
                    {chat.length == 0 && (
                      <div className="col-span-12 flex flex-col items-center justify-center">
                        {receiver !== undefined && <span className="font-medium py-2 text-gray-400 text-sm">
                          No messages yet with {chats.map((data) => {
                            if(data.u1 == receiver) return data.u1Name;
                            else if( data.u2 == receiver) return data.u2Name;
                          })} send the first message... 🚀
                        </span>}
                        {
                          receiver == undefined && chats.length != 0 && <span className="font-medium py-2 text-gray-400 text-sm">
                          Select a chat to start messaging... 🚀
                          </span>
                        }
                        {
                          chats.length == 0 && <span className="font-medium py-2 text-gray-400 text-sm">
                          No chats yet... 🚀 To chat with someone, go to the <Link to="/products" className="text-indigo-500">Users</Link> page and start a chat with someone.
                          </span>
                        }
                      </div>
                    )}
                    {chat.map((item, i) => {
                      const { text, time, sentBy } = item;
                      return (
                        <ChatTextComponent
                          key={i}
                          message={text}
                          time={time}
                          isReceiver={sentBy == receiver ? true : false}
                        />
                      );
                    })}
                    <div ref={bottomRef} />
                  </div>
                </div>
              </div>

              {receiver !== undefined && <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ">
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
                  <button
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    onClick={handleMessage}
                    disabled={receiver == undefined}
                    style={{
                      cursor: receiver == undefined ? "not-allowed" : "pointer",
                    }}
                  >
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
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
