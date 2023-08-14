import {db} from '../utils/configurationFirebase.js';
import { useEffect, useState } from 'react';


export const useGetMessageByConversationId = (conversationId) => {
    
        const [conversationIdState, setConversationIdState] = useState(conversationId);
        const [messages, setMessages] = useState([]);
    
        const getMessageByConversationId = async (conversationId) => {
            const messagesRef = await db.collection('conversations').doc(conversationId).collection('messages').get();
            const messages = messagesRef.docs.map(doc => doc.data());
            return messages;
        }
    
        useEffect(() => {
            if (conversationIdState === null || conversationIdState === undefined || conversationIdState === ''){
                return;
            }
            const getMessagesAndSet = async () => {
                const messages = await getMessageByConversationId(conversationIdState);
                setMessages(messages);
            }
            getMessagesAndSet();
        }, [conversationIdState]);
    
        return {messages, setConversationIdState};
}