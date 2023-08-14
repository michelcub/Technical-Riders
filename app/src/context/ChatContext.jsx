//import { db, app } from "../utils/configurationFirebase.js";


import useLoginContext from "./LoginContext";
import { useContext, createContext, useEffect } from "react";
import { useState } from "react";

import { useGetConversationsById } from "../hooks/useGetConversationsById.jsx";




const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const {store: storeLoginContext} = useLoginContext();
    const {myUser} = storeLoginContext;

    const [myUserId, setMyUserId] = useState(myUser.id||null);
    const [fromUserId, setFromUserId] = useState(null);
    const [conversations, setConversations] = useState(useGetConversationsById(myUserId));
    const [conversationId, setConversationId] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState(null);


    const handleUserInputMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSearchInput = (e) => {
        return
    }

    const handleSelectFromUser = (e) => {
        return
    }

    const handleSendMessage = (e) => {
        return
    }
    
    const handleCreateConversation = (e) => {
        return
    }

   

    const store = {
        conversations,
        conversation,
        conversationId,
        message,
    }

    const actions = {
        
    }
    
    return (
        <ChatContext.Provider value={{ store, actions }}>
        {children}
        </ChatContext.Provider>
    );
}
const useChat = () => useContext(ChatContext);
export default useChat;