import { useState } from "react";
import ShareSvg from "./icons/ShareSvg";
import { useTranslations } from "next-intl";

export default function ShareSection() {

    const t = useTranslations("ShareSection");

    const [isClicked, setIsClicked] = useState(false);

    const copyToClipboard = () => {
        const url = window.location.hostname;
        navigator.clipboard.writeText(url);
        
        setIsClicked(true);
        
        setTimeout(() => {
            setIsClicked(false);
        }, 2000);
    };

    return (
        <article className="flex flex-col gap-5 rounded-2xl border-2  border-gray-200 p-6 font-bold text-gray-700">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                    {t('title')}
                    <ShareSvg color={"#374151"} className={"ml-2 w-6 h-6"} />
                </h2>
            </div>
            <button
                className={`rounded-2xl border-b-4 ${isClicked ? 'border-green-500 bg-green-400 py-3 uppercase text-white transition hover:border-green-400 hover:bg-green-300' : 'border-blue-500 bg-blue-400 py-3 uppercase text-white transition hover:border-blue-400 hover:bg-blue-300'}`} 
                onClick={copyToClipboard}
            >
                {t('copyButton', { isClicked })}
            </button>
        </article>
    );
}
