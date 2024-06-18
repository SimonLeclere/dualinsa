"use client";

import { useState } from "react";
import Image from "next/image";

import { SettingsRightNav } from "@/components/SettingsRightNav";
import BottomBar from "@/components/BottomBar";
import CustomAvatar from "./CustomAvatar";


import pp1 from "@/public/pp/pp-1.png"
import pp2 from "@/public/pp/pp-2.png"
import pp3 from "@/public/pp/pp-3.png"
import pp4 from "@/public/pp/pp-4.png"
import pp5 from "@/public/pp/pp-5.png"
import pp6 from "@/public/pp/pp-6.png"
import pp7 from "@/public/pp/pp-7.png"
import pp8 from "@/public/pp/pp-8.png"
import pp9 from "@/public/pp/pp-9.png"
import pp10 from "@/public/pp/pp-10.png"
import pp11 from "@/public/pp/pp-11.png"

const avatarSources = [
  { src: pp1.src },
  { src: pp2.src },
  { src: pp3.src },
  { src: pp4.src },
  { src: pp5.src },
  { src: pp6.src },
  { src: pp7.src },
  { src: pp8.src },
  { src: pp9.src },
  { src: pp10.src },
  { src: pp11.src },
];

export default function Account() {

  const currentUsername = "John Doe";
  const currentLanguage = "Français";
  const currentAvatar = pp1.src;

  const [username, setUsername] = useState(currentUsername);
  const [language, setLanguage] = useState(currentLanguage);
  const [avatar, setAvatar] = useState(currentAvatar);

  const saveChanges = () => {
    console.log("Changes saved");
  };

  return (
    <div>

      <BottomBar selectedTab="profile" />

      <div className="mx-auto flex flex-col gap-5 px-4 py-20 sm:py-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="text-lg font-bold text-gray-800 sm:text-2xl pt-5">
            Compte
          </h1>
          <button
            className="rounded-2xl border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
            onClick={saveChanges}
            disabled={currentUsername === username && currentLanguage === language && currentAvatar === avatar}
          >
            Enregistrer
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div className="flex w-full max-w-xl flex-col gap-8">


            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">Nom d&apos;utilisateur</label>
              <input
                className="rounded-2xl border-2 border-gray-200 px-5 py-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">Langue</label>
              <select
                className="rounded-2xl border-2 border-gray-200 px-5 py-3"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Français">Français</option>
                <option value="English">English</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">Photo de profil</label>
              <div className="flex flex-wrap gap-2 justify-center">

                <CustomAvatar avatar={avatar} setAvatar={setAvatar} />

                {avatarSources.map((avatarSource, index) => (
                  <div
                    key={index}
                    // rounded-[15px] for beautiful rounded corners
                    className={`w-28 h-28 p-1 cursor-pointer rounded-[20px] ${avatar === avatarSource.src ? "border-2 border-blue-500" : "border-2 border-gray-200"} transition-colors duration-300`}
                    onClick={() => avatar !== avatarSource.src ? setAvatar(avatarSource.src) : setAvatar(null)}
                  >
                    <Image
                      src={avatarSource.src}
                      alt={`Photo de profil ${index + 1}`}
                      className="rounded-2xl"
                      width={112}
                      height={112}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SettingsRightNav selectedTab="Account" />
        </div>
      </div>
    </div>
  );
};
