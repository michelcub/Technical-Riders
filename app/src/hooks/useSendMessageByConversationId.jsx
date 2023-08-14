import { useEffect, useState } from 'react';

import 'firebase/firestore';


export const userSendMessageByConversationId = (conversationId=null, message='', myUserId) => {
    const [conversationIdState, setConversationIdState] = useState(conversationId);
    const [newMessage, setNewMessage] = useState(message);

    const sendMessageByConversationId = async (conversationId, message) => {
        const messagesRef = await db.collection('conversations').doc(conversationId).collection('messages').add({
            message,
            myUserId,
            timestamp: db.firestore.FieldValue.serverTimestamp(),
          });
        return messagesRef.id;
    }

    const db = firebase.firestore();

    useEffect(() => {
        if (conversationIdState === null || conversationIdState === undefined || conversationIdState === ''){
            return;
        }
        if (message === null || message === undefined || message ===''){
            return;
        }
        const sendMessageAndSet = async () => {
            const message = await sendMessageByConversationId(conversationIdState);
            setNewMessage(message);
        }
        sendMessageAndSet();
    },[conversationIdState, message, newMessage, sendMessageByConversationId])

    return {message, setConversationIdState};
}