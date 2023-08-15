//import { db, app } from "../utils/configurationFirebase.js";

import PocketBase from 'pocketbase';
import useLoginContext from "./LoginContext";
import { useContext, createContext, useEffect } from "react";
import { useState } from "react";


import getUserByUserName from "../services/getUserByUserName";


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const {store: storeLoginContext} = useLoginContext();
    const {myUser} = storeLoginContext;


    const [listFindUser, setListFindUser] = useState([]);
    const [listChatByMyUser, setListChatByMyUser] = useState([]);




    //pocketbase

    const pb = new PocketBase('https://rider.pockethost.io');


    const createConversation = async (myUser=null, to_user=null) => {
        try{
            if(myUser ===null || to_user === null){
                return
            }
            
            const conversation = await pb.collection('conversations').create({
                user_id1: myUser,
                user_id2: to_user,
            });
            console.log(conversation);

        }catch(err){
            console.log(err)
        }
        
    }
    

    const subscribtions = async () => {
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
            
            createConversation(parseInt(myUser.id),parseInt(to_user.user.id))

            
        }catch(error){
            console.log(error)
        }
    }
   
    

    console.log(listChatByMyUser)
   

    const store = {
       listFindUser

    }

    const actions = {
        handleFindUserByUserName,
        handleCreateChat,

    }
    
    return (
        <ChatContext.Provider value={{ store, actions }}>
        {children}
        </ChatContext.Provider>
    );
}
const useChat = () => useContext(ChatContext);
export default useChat;