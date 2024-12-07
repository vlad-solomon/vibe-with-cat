import { useRef, useState } from "react";
import Button from "./Button";
import { SpeakerWaveIcon } from "@heroicons/react/20/solid";

export default function VolumeSlider() {
    const [volume, setVolume] = useState(1);
    const sliderRef = useRef(null);

    function updateVolume(e) {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newVolume = Math.min(Math.max(offsetX / rect.width, 0), 1);
        setVolume(newVolume);
    }

    function handleMouseMove(event) {
        updateVolume(event);
    }

    function handleMouseUp() {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    function handleMouseDown(event) {
        updateVolume(event);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    return (
        <>
            <Button icon={SpeakerWaveIcon} />
            <div
                className="relative w-40 border-white/20 border rounded bg-gray overflow-hidden cursor-pointer"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
            >
                <div
                    className="absolute h-full w-1/2 bg-white"
                    style={{ width: `${volume * 100}%` }}
                ></div>
            </div>
        </>
    );
}
