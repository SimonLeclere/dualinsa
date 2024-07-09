// checkpoint.js
import React from "react";

export default function CheckpointPlaceholder({ offset, onClick }) {

    return (
        <button
            onClick={onClick}
            className={"cursor-pointer"}
            style={{ transform: `translateX(${offset}px)` }}
        >
            <div className="flex justify-center items-center w-20 h-20 rounded-full border-b-8 shadow-md border-[#b7b7b7] bg-gray-100 hover:bg-gray-200">
                <h3 className="text-2xl font-bold text-[#b7b7b7]">+</h3>
            </div>
        </button>
    );
}