
import {GrSend} from 'react-icons/gr'

import useChat from '../../context/ChatContext';


export const Chat = () => {


    const {store, actions} = useChat()

    
    

    


//     pb.collection('messages').unsubscribe('RECORD_ID'); // remove all 'RECORD_ID' subscriptions
//     pb.collection('messages').unsubscribe('*'); // remove all '*' topic subscriptions
//  pb.collection('messages').unsubscribe(); // remove all subscriptions in the collection



    
    return (
        <section className="h-full p-2 w-[80%] ">
            <div className="w-full h-full rounded-xl bg-slate-50/5">
                <div className="w-full h-full">
                    <div className="w-full h-[90%] p-3">
                        <span className='p-4'>user</span>
                        <div className='w-full h-full'>
                        <div className="chat chat-start">
                            <div className="text-black chat-bubble bg-slate-300 w-[40%]">It's over Anakin, <br/>I have the high ground.</div>
                        </div>
                        <div className="chat chat-end">
                            <div className="text-black chat-bubble bg-slate-300 w-[40%]">You underestimate my power!</div>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <input className="w-[70%] p-2  rounded-s bg-slate-200" type="text" />
                        <button className="h-full  xl:w-[8%] md:w-[18%] bg-slate-200 flex items-center p-2 gap-2 rounded-e"><GrSend/>Send</button>
                    </div>
                </div>
            </div>
        </section>
    )
}