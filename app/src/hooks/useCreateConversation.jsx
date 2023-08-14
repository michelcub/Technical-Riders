import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const useCreateConversation = (myUserId=null, fromUserId=null) => {

    const [myUserIdState, setMyUserIdState] = useState(myUserId);
    const [fromUserIdState, setFromUserIdState] = useState(fromUserId);
    const [conversationId, setConversationId] = useState(null);

    const db = firebase.firestore();

    const createConversation = async (userId, userId2) => {
        const conversationRef = await db.collection('conversations').add({
            userIds: [userId, userId2],
            messages: [],
        });
        return conversationRef.id;
    }

    useEffect(() => {
        if (fromUserIdState === null || fromUserIdState === undefined || fromUserIdState === ''){
            return;
        }
        if (myUserIdState === null || myUserIdState === undefined || myUserIdState === ''){
            return;
        }
        const createConversationAndSetId = async () => {
            const conversationId = await createConversation(myUserIdState, fromUserIdState);
            setConversationId(conversationId);
        }
        createConversationAndSetId();
    }, [myUserIdState, fromUserIdState]);



    return {conversationId, setMyUserIdState, setFromUserIdState};
}