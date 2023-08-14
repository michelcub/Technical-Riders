export const ChatCard = () => {
    return (
        <article className="flex h-14 bg-slate-50/10 hover:bg-slate-50/5">
            <div className="min-w-[20%] h-full p-1">
                <img className="w-full h-full border rounded" src="" alt="" />
            </div>
            <div className="overflow-hidden">
                <h2 className="font-semibold ms-3">User Name</h2>
                <p className="mt-1 overflow-hidden ms-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam optio corrupti quam, numquam harum quis. Totam nisi quasi nostrum, illum ex ad molestias dolor praesentium sunt id neque minima sapiente!</p>
            </div>
        </article>
    )
}