import { ChatCard } from "./ChatCard"

export const Contacts = () => {
    return (
        <section className="w-[100%] md:w-[45%] lg:w-[30%] xl:w-[20%] full h-full p-2 overflow-hidden">
            <div className="w-full h-full rounded-xl bg-slate-50/5">
                <div className="p-2 text-xl font-semibold text-center">
                    <h2 className="">Contacts</h2>
                </div>
                <div className="flex justify-center w-full p-3">
                    <input className="w-full p-1 text-xl text-black rounded bg-slate-200" type="text" />
                </div>
                <div className="w-full h-full">
                    <ChatCard/>
                </div>
            </div>
        </section>
    )
}