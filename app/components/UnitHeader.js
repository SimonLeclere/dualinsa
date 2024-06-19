import Link from "next/link";

import BottomBar from "@/components/BottomBar";
import GuidePDFSvg from "@/components/icons/GuidePDF";


//Header of the unit containing the unit name, number, and a button linked to the unit's pdf file 
export default function unitHeader({unitNumber, unitName, courseId }) {

  return (
    <div className={["w-5/6 max-w-2xl text-white sm:rounded-xl bg-purple-400 m-1"]}>
      <BottomBar selectedTab="courses" />
      <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Unit {unitNumber}</h2>
          <p className="text-lg">{unitName}</p>
        </div>
        <button className="m-2 px-5 py-2 flex gap-x-3 border-2 border-zinc-600 rounded-lg hover:bg-purple-600 shadow-md">
          <GuidePDFSvg />
          <Link href={`/RepPDFcours/${courseId}/${unitNumber}`} >COURS</Link>
        </button>
      </header>
      </div>
    );
}

