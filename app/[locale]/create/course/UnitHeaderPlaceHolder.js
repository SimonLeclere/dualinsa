import PlusSvg from "@/components/icons/PlusSvg";
import React from "react";

export default function UnitCreatorHeaderPlaceholder({ onClick }) {
    return (
        <div
            onClick={onClick}
            className="relative group w-5/6 max-w-2xl rounded-xl border-4 border-dashed border-gray-300 bg-gray-100 m-1 p-4 transition hover:bg-gray-200 cursor-pointer"
        >
            <header className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-40 h-8 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-32 h-6 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <PlusSvg className="w-6 h-6 opacity-0 group-hover:opacity-100 transition" color={"#b7b7b7"} />
                </div>
                <div className="w-28 h-10 bg-gray-300 rounded"></div>
            </header>
        </div>
    );
    {/* <PlusSvg className="w-6 h-6" color={"#b7b7b7"} /> */ }
}