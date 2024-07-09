import { Link } from "@/navigation";

import GuidePDFSvg from "@/components/icons/GuidePDF";
import EditPencilSvg from "@/components/icons/EditPencilSvg";

import { useTranslations } from "next-intl";


//Header of the unit containing the unit name, number, and a button linked to the unit's pdf file 
export default function UnitCreatorHeader() {

    const t = useTranslations("UnitHeader");

    return (
        <div className={"w-5/6 max-w-2xl text-white rounded-xl bg-purple-400 m-1"}>
            <header className="flex items-center justify-between gap-4 p-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold flex items-center align-middle gap-2">
                        Chapitre 1
                    </h2>
                    <p className="text-lg font-semibold flex items-center gap-2">
                        Introduction
                        <button className="flex items-center gap-1">
                            <EditPencilSvg width={15} height={15} />
                        </button>
                    </p>
                </div>
                <button className="flex items-center gap-3 rounded-2xl border-2 border-b-4 p-3 transition hover:text-gray-100 border-purple-500">
                    <GuidePDFSvg />
                    <Link
                        href="#"
                        className="uppercase"
                    >
                        {t('lessonLink')}
                    </Link>
                </button>
            </header>
        </div>
    );
}