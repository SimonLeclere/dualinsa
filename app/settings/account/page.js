"use client";

import { useState } from "react";
import { SettingsRightNav } from "../../components/SettingsRightNav";
import Image from "next/image";

import pp1 from "../../../public/pp/pp-1.png"
import pp2 from "../../../public/pp/pp-2.png"
import pp3 from "../../../public/pp/pp-3.png"
import pp4 from "../../../public/pp/pp-4.png"
import pp5 from "../../../public/pp/pp-5.png"
import pp6 from "../../../public/pp/pp-6.png"
import pp7 from "../../../public/pp/pp-7.png"
import pp8 from "../../../public/pp/pp-8.png"
import pp9 from "../../../public/pp/pp-9.png"
import pp10 from "../../../public/pp/pp-10.png"
import pp11 from "../../../public/pp/pp-11.png"
import pp12 from "../../../public/pp/pp-12.png"

const avatarSources = [
  { src: pp1.src, title: "pp-1" },
  { src: pp2.src, title: "pp-2" },
  { src: pp3.src, title: "pp-3" },
  { src: pp4.src, title: "pp-4" },
  { src: pp5.src, title: "pp-5" },
  { src: pp6.src, title: "pp-6" },
  { src: pp7.src, title: "pp-7" },
  { src: pp8.src, title: "pp-8" },
  { src: pp9.src, title: "pp-9" },
  { src: pp10.src, title: "pp-10" },
  { src: pp11.src, title: "pp-11" },
  { src: pp12.src, title: "pp-12" },
];

export default function Account() {
  // TODO : fix 
  let username = "mbegoud";
  const setName = (my_name) => {
    username = my_name;
  };

  let language = "Français";
  const setLanguage = (my_language) => {
    language = my_language;
  };

  let avatar = { src: pp1.src, title: "pp-1" };
  const setAvatar = (my_avatar) => {
    avatar = my_avatar;
  };

  const [localUsername, setLocalUsername] = useState(username);
  const [localLanguage, setLocalLanguage] = useState(language);
  const [localAvatar, setLocalAvatar] = useState(avatar);

  const accountOptions = [
    { title: "Username", value: localUsername, setValue: setLocalUsername },
    { title: "Preference language", value: localLanguage, setValue: setLocalLanguage },
    { title: "Avatar", value: localAvatar, setValue: setLocalAvatar },
  ];

  return (
    <div>
      <div className="mx-auto flex flex-col gap-5 px-4 py-20 sm:py-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="text-lg font-bold text-gray-800 sm:text-2xl">
            Compte
          </h1>
          <button
            className="rounded-2xl border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
            onClick={() => {
              setName(localName);
              setLanguage(localLanguage);
              setAvatar(localAvatar)
            }}
            disabled={username === localUsername && language === localLanguage && avatar.src === localAvatar.src} 
          >
            Enregistrer
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div className="flex w-full max-w-xl flex-col gap-8">
            {accountOptions.map(({ title, value, setValue }) => {
              if(title === "Username") {
                return (
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-800">{title}</label>
                    <input
                      className="rounded-2xl border-2 border-gray-200 px-5 py-3"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                );
              } 
              if (title === "Preference language") {
                return (
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-800">{title}</label>
                    <select
                      className="rounded-2xl border-2 border-gray-200 px-5 py-3"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    >
                      <option value="Français">Français</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                );
              }
              if (title === "Avatar") {
                return (
                  <div className="flex flex-col gap-2" key={title}>
                    <label className="font-bold text-gray-800">{title}</label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {avatarSources.map((avatarSource, index) => (
                        <div
                          key={index}
                          className={`w-1/5 p-1 cursor-pointer rounded-2xl ${
                            localAvatar.src === avatarSource.src
                              ? "border-4 border-blue-500"
                              : "border-2 border-gray-200"
                          }`}
                          onClick={() => setValue(avatarSource)}
                        >
                          <Image
                            src={avatarSource.src}
                            alt={`Photo de profile ${index + 1}`}
                            className="rounded-2xl"
                            width={250}
                            height={250}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            }
            )}
          </div>
          <SettingsRightNav selectedTab="Account" />
        </div>
      </div>
    </div>
  );
};
