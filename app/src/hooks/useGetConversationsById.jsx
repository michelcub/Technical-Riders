
import { useEffect, useState } from 'react';
//import firebase from 'firebase/app';
import 'firebase/firestore';

export const useGetConversationsById = (myUserId = null) => {
    const [myUserIdState, setMyUserIdState] = useState(myUserId);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const db = firebase.firestore();

    const getConversationByUsersId = async (userId) => {
        try {
            const conversationsRef = db.collection('conversations').where('userIds', 'array-contains', userId);
            const snapshot = await conversationsRef.get();
            const conversationsData = snapshot.docs.map(doc => doc.data());
            return conversationsData;
        } catch (error) {
            setError(error);
            return [];
        }
    }

    useEffect(() => {
        if (myUserIdState === null || myUserIdState === undefined || myUserIdState === '') {
            return;
        }

        const unsubscribe = getConversationByUsersId(myUserIdState)
            .then((conversationsData) => {
                setConversations(conversationsData);
                setLoading(false);
            });

        return () => {
            // Limpieza del listener si es necesario
            unsubscribe();
        };
    }, [myUserIdState]);

    return { conversations, setMyUserIdState, loading, error };
}