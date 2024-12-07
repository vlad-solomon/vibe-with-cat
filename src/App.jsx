import { useEffect, useState } from "react";
import cat from "./assets/cat.webm";
import ReactPlayer from "react-player/youtube";
import Button from "./components/Button";

import {
    BackwardIcon,
    MagnifyingGlassIcon,
    PlayIcon,
    ForwardIcon,
    Cog6ToothIcon,
} from "@heroicons/react/20/solid";
import VolumeSlider from "./components/VolumeSlider";
import { useDebounce } from "@uidotdev/usehooks";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("cats");
    const debouncedQuery = useDebounce(query, 500);
    const [results, setResults] = useState([]);
    const [link, setLink] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `${
                    import.meta.env.VITE_CAT_ROOT
                }/videos?title=${debouncedQuery}`
            );
            const data = await response.json();
            setResults(data);
            setLoading(false);
        }

        fetchData();
    }, [debouncedQuery]);

    return (
        <div className="relative h-full w-full border border-white/20 rounded-md bg-gray shadow-lg">
            <div className="absolute inset-0 overflow-hidden rounded-md">
                <ReactPlayer
                    url={link}
                    width="100%"
                    height="100%"
                    autoPlay={true}
                    playing={true}
                    volume={0.25}
                />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-md">
                <video
                    src={cat}
                    className="h-full w-full object-cover scale-105"
                    muted={true}
                    autoPlay={true}
                    loop={true}
                ></video>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-between">
                <div className="relative p-2 bg-gray border border-white/20 rounded-md shadow-md -translate-y-1 max-w-[500px] w-full text-center overflow-hidden">
                    <span className="leading-none font-bold">
                        Title of the video here
                    </span>
                    <div className="absolute top-0 left-0 bg-white/20 h-full w-1/2 -z-10"></div>
                </div>
                <div className="translate-y-1 flex gap-2 flex-col items-center max-w-[500px] w-full">
                    <div className="w-full h-[500px] bg-gray border-white/20 border rounded shadow-lg overflow-auto">
                        {loading ? "Loading..." : ""}
                        {!loading &&
                            results?.map(({ id, title, channel, link }) => (
                                <div key={id} onClick={() => setLink(link)}>
                                    &gt;&gt; {title}
                                </div>
                            ))}
                    </div>
                    <input
                        type="text"
                        className="p-2 w-full border border-white/20 rounded shadow-lg bg-gray outline-none font-bold"
                        placeholder="Search..."
                        onChange={(e) => {
                            setLoading(true);
                            setQuery(e.target.value);
                        }}
                        defaultValue={query}
                    />
                    <div className="flex gap-4">
                        <Button icon={MagnifyingGlassIcon} />
                        <div className="flex gap-1">
                            <Button icon={BackwardIcon} />
                            <Button icon={PlayIcon} />
                            <Button icon={ForwardIcon} />
                            <VolumeSlider />
                        </div>
                        <Button icon={Cog6ToothIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
}
