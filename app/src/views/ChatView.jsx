import { Chat } from "../components/chat/Chat"
import { Contacts } from "../components/chat/Contacts"
import { ChatProvider } from "../context/ChatContext"

export const ChatView = () => {
    return (
        <ChatProvider>
            <section className="flex w-screen h-[38rem] max-h-screen">
                <Contacts/>
                <Chat/>
            </section>
        </ChatProvider>
    )
}