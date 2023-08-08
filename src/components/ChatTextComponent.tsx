import { Timestamp } from "firebase/firestore";
import moment from "moment";

const ChatTextComponent = (props: { message: string; isReceiver: boolean; time: Timestamp; }) => {
    const { message, isReceiver, time } = props;
    const tailwindMessageCSS = isReceiver ? "ml-3 bg-white relative text-sm py-4 px-4 shadow rounded" : "mr-3 bg-indigo-100 relative text-sm py-4 px-4 shadow rounded";
    const tailwindPositionCSS = isReceiver ? "col-start-1 col-end-8 p-3 rounded" : " col-start-6 col-end-13 p-3 rounded";
    
    const timestamp = time.seconds;
    const nanoseconds = time.nanoseconds;


    const Date = moment.unix(timestamp).add(nanoseconds / 1000000, 'milliseconds');
    const forDate = Date.format('DD-MM-YY HH:mm');
  return (
   <div className={tailwindPositionCSS}>
    <div className={tailwindMessageCSS} >
        <div>{message}</div>
        <div className="absolute text-[8px] sm:text-xs bottom-0 right-0 -mb-5 mr-2 text-indigo-300 ">{forDate}</div>
    </div>
    
   </div>
  )
}

export default ChatTextComponent