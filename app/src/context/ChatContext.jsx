//import { db, app } from "../utils/configurationFirebase.js";

import PocketBase from 'pocketbase';
import useLoginContext from "./LoginContext";
import { useContext, createContext, useEffect } from "react";
import { useState } from "react";


import getUserByUserName from "../services/getUserByUserName";
import { toast } from 'react-hot-toast';


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const {store: storeLoginContext} = useLoginContext();
    const {myUser} = storeLoginContext;


    const [listFindUser, setListFindUser] = useState([]);
    const [listChatByMyUser, setListChatByMyUser] = useState(null);
    const [selectConversation, setSelectConversation] = useState(null);
    const [listMessagesByConversation, setListMessagesByConversation] = useState(null);






    //pocketbase

    const pb = new PocketBase('https://rider.pockethost.io');


    const createConversation = async (myUserId=null, toUserId=null, myUserName=null, toUserName=null, img1='', img2='') => {
        try{
            if(myUserId ===null || toUserId === null || myUserName === null || toUserName === null){
                return
            }
            
            const conversation = await pb.collection('conversations').create({
                user_id1: myUserId,
                user_id2: toUserId,
                username1: myUserName,
                username2: toUserName,
                img1: img1,
                img2: img2, 
            });
            console.log(conversation);

        }catch(err){
            console.log(err)
        }
        
    }
    

    const subscribtions = async () => {
        try{
            await pb.collection('messages').subscribe('*', function (e) {
                console.log(e.action);
                console.log(e.record);
            });
    
            await pb.collection('conversations').subscribe('*', function (e) {
                console.log(e.action);
                console.log(e.record);
            });
            const resultList = await pb.collection('conversations').getList(1, 50, {
                filter: `user_id1 = ${myUser.id} || user_id2 = ${myUser.id}`,
            });
            await setListChatByMyUser(resultList);
        }catch(error){
            console.log(error)
        }
        
    }
    subscribtions()



    //

    
    const handleFindUserByUserName = (e) => {
        try{
            const userName = e.target.value;
            getUserByUserName(userName).then((users) => {
                if(users.length === 0) return;
                if(users.length > 0){
                    setListFindUser(users);
                }
            })
            
        }catch(error){
            console.log(error)
        }
        
    }

    const handleCreateChat = (e) => {
        try{
            const {id} = e.target.parentNode.parentNode;
            const to_user = listFindUser.find((user) => parseInt(user.user.id) === parseInt(id));
            if(to_user.user.id === myUser.id){
                toast.error('No puedes chatear contigo mismo');
                return 
            }
            
            const response = createConversation(parseInt(myUser.id),parseInt(to_user.user.id), myUser.username, to_user.user.username, myUser.img, to_user.user.img)
            console.log(response)
            
        }catch(error){
            console.log(error)
        }
    }

    const handleSelectChat = (e) => {
        try{
            const {id} = e.target.parentNode.parentNode;
            
            setSelectConversation(id);
            //getMessagesByConversation(conversation.id)

            console.log(selectConversation.json())
        }catch(error){
            console.log(error)
        }
    }
   
    

    

    const store = {
        myUser,
       listFindUser,
       listChatByMyUser,
        selectConversation,

    }

    const actions = {
        handleFindUserByUserName,
        handleCreateChat,
        handleSelectChat

    }
    
    return (
        <ChatContext.Provider value={{ store, actions }}>
        {children}
        </ChatContext.Provider>
    );
}
const useChat = () => useContext(ChatContext);
export default useChat;