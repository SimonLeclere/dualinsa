"use client";

import { useState } from "react";

export default function Button({ children, onClick, color }) {
  
  let [count, setCount] = useState(0);

  if (color === 'green') {
    return (
      <button
        onClick={onClick}
        className="w-full rounded-2xl border-b-4 text-white border-green-700 bg-green-600 px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 md:min-w-[320px]"
      >
        {children}
      </button>
    );
  }

  if (color === 'blue') {
    // className="rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-110"
    return (
      <button
        onClick={onClick}
        className="w-full rounded-2xl border-b-4 text-white border-blue-700 bg-blue-600 px-10 py-3 text-center font-bold uppercase transition hover:border-blue-600 hover:bg-blue-500 md:min-w-[320px]"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="w-full rounded-2xl border-b-4 text-white border-gray-700 bg-gray-600 px-10 py-3 text-center font-bold uppercase transition hover:border-gray-600 hover:bg-gray-500 md:min-w-[320px]"
    >
      {count}
    </button>
  );
};