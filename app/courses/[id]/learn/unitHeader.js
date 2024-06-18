import Link from "next/link";

import BottomBar from "@/components/BottomBar";
import GuidePDFSvg from "@/components/icons/GuidePDFSvg";


//Header of the unit containing the unit name, number, and a button linked to the unit's pdf file 
export default function unitHeader({color, unitNumber, unitName }) {

  // if (color === 'green') {
    // return (
    //   <div 
    //     className={`${className} flex flex-col items-center justify-center`}
    //   >
    //     <h1 className="text-3xl font-bold">{unitName}</h1>
    //     <h2 className="text-xl font-bold">Unité {unitNumber}</h2>
    //     <button
    //       onClick={onClick}
    //       className="flex items-center gap-1 rounded-2xl border-2 bg-white px-4 py-2 text-sm font-bold uppercase border-gray-500 text-gray-500"
    //     >
    //       Voir le PDF
    //     </button>
    //   </div>
    // );
    
  // }
  return (
    <div className={["w-5/6 max-w-2xl text-white sm:rounded-xl bg-purple-400 m-1"]}>
      <BottomBar selectedTab="courses" />
      <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Unit {unitNumber}</h2>
          <p className="text-lg">{unitName}</p>
        </div>
        <button className="m-2 px-5 py-2 flex gap-x-3 border border-zinc-800 rounded-lg hover:bg-purple-600">
          <GuidePDFSvg />
          <Link href="/pdfs/thermochimie.pdf" >COURS</Link>
        </button>
      </header>
      </div>
    );
}