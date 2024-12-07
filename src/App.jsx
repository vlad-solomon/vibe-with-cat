import { useEffect, useState } from "react";
import cat from "./assets/cat.webm";
import ReactPlayer from "react-player/youtube";

export default function App() {
    const [query, setQuery] = useState("cats");
    const [results, setResults] = useState([]);
    const [link, setLink] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `${import.meta.env.VITE_CAT_ROOT}/videos?title=${query}`
            );
            const data = await response.json();
            setResults(data);
        }

        fetchData();
    }, [query]);

    console.log(results);

    return (
        <div className="relative h-full w-full border-4 border-black/10 rounded-md bg-black/50 overflow-hidden">
            <video
                src={cat}
                className="absolute h-full w-full object-cover scale-105"
                muted={true}
                autoPlay={true}
                loop={true}
            ></video>
            <ReactPlayer
                url={link}
                width="100%"
                height="100%"
                autoPlay={true}
                playing={true}
                volume={0.25}
            />
            <div className="absolute top-5 right-5 flex flex-col gap-5 w-[500px]">
                <input
                    type="text"
                    className="text-xl font-bold p-5 rounded-md border-4 border-black/10 bg-gray text-white placeholder:text-white/50 outline-none"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="bg-gray border-4 border-black/10 rounded-md flex flex-col gap-4 p-2">
                    {results
                        ?.slice(0, 5)
                        ?.map(({ id, title, channel, link }) => (
                            <div
                                key={id}
                                className="flex gap-2 pb-4 border-b border-white/5 last:pb-0 last:border-0 cursor-pointer"
                                onClick={() => setLink(link)}
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                                    alt={title}
                                    className="aspect-video h-[100px] rounded"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold leading-5 line-clamp-2 text-balance">
                                        {title}
                                    </span>
                                    <span className="text-white/50">
                                        {channel.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
