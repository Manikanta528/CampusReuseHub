import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../utilities/routes';
const PopUp = () => {
    const navigate = useNavigate();
  return (
    <div className="fixed flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-screen bg-slate-500/50">
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-2xl shadow ">
            <div className="py-12 opacity-80 bg-background-pattern bg-26 rounded-2xl flex-col justify-center items-center text-center">
                <svg className="hidden mb-4 text-red-400 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 ">🥺 You are not logged in yet, So Please?</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    onClick={() => {navigate(LOGIN)}}
                >
                    Login now
                </button>
            </div>
        </div>
    </div>
</div>
  )
}

export default PopUp
