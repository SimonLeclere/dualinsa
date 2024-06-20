"use client";

import useSwr from "swr";

import { useState } from "react";
import Image from "next/image";
import { useEffect } from 'react';

import { SettingsRightNav } from "@/components/SettingsRightNav";
import BottomBar from "@/components/BottomBar";
import NavBar from "@/components/NavBar";

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
import pp12 from "@/public/pp/pp-12.png"

const avatarSources = [ pp1, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12 ];


export default function Account() {

  const { data: user, error, isLoading } = useSwr('/api/users/', (url) => fetch(url).then((res) => res.json()));

  if (user.message) return <div>Erreur: {user.message}</div>;
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState('')
  
  useEffect(() => {
    if (user) {
      const { username, language, avatar } = user;
      setUsername(username);
      setLanguage(language);
      setAvatar(avatar);
    }
  }, [user]);
  
  const saveChanges = async (event) => {
    event.preventDefault();
    // Request to update user
    const res = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, language, avatar }),
    });
  };

  return (
      <div className="min-h-screen justify-center">

      <NavBar />
      <div className="mx-auto flex flex-col gap-5 px-4 pt-20 pb-32 sm:pt-10 md:pl-28 lg:pl-72">
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
          
          <BottomBar selectedTab="profile" />
        </div>
      </div>
    </div>
  );
};
