'use client';


import Image from "next/image";

import useSwr from "swr";
import { useEffect, useState } from 'react';
import { useTranslations } from "next-intl";
import { useRouter } from '@/navigation';

import { SettingsRightNav } from "@/components/SettingsRightNav";
import BottomBar from "@/components/BottomBar";
import NavBar from "@/components/NavBar";

import pp1 from "@/public/pp/pp-1.png";
import pp2 from "@/public/pp/pp-2.png";
import pp3 from "@/public/pp/pp-3.png";
import pp4 from "@/public/pp/pp-4.png";
import pp5 from "@/public/pp/pp-5.png";
import pp6 from "@/public/pp/pp-6.png";
import pp7 from "@/public/pp/pp-7.png";
import pp8 from "@/public/pp/pp-8.png";
import pp9 from "@/public/pp/pp-9.png";
import pp10 from "@/public/pp/pp-10.png";
import pp11 from "@/public/pp/pp-11.png";
import pp12 from "@/public/pp/pp-12.png";

const avatarSources = [
  pp1,
  pp2,
  pp3,
  pp4,
  pp5,
  pp6,
  pp7,
  pp8,
  pp9,
  pp10,
  pp11,
  pp12,
];

import { redirect } from "@/navigation";
import { useSession } from "next-auth/react";

export default function Account() {
  
  const t = useTranslations("Settings");
  const router = useRouter();

  const { data: user, error, isLoading, mutate } = useSwr('/api/users/', (url) => fetch(url).then((res) => res.json()));

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [avatar, setAvatar] = useState(null);
  
  // TODO: remove
  useEffect(() => {
    if (user) {
      const { username, language, avatar } = user;
      setUsername(username);
      setLanguage(language);
      setAvatar(avatar);
    }
  }, [user]);
  
  const session = useSession();
  if (session.status === "loading") return <div>Loading...</div>;
  if (session.status !== "authenticated") return redirect("/auth/signin");
  
  if (user?.message) return <div>Erreur: {user.message}</div>;

  const currentUsername = user?.username;
  const currentLanguage = user?.language
  const currentAvatar = user?.avatar;

  const saveChanges = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Request to update user
    const res = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, language, avatar }),
    });

    const updatedUser = await res.json();
    if (res.status !== 200 && updatedUser.message) {
      setErrorMessage(t('usernameAlreadyTaken'));
      setLoading(false);
      setUsername(currentUsername);
      return;
    
    }

    // change language
    if (language !== currentLanguage) {
      changeLanguage(language);
    }

    mutate({ ...user, username, language, avatar }, false);
    setLoading(false);
  };

  const changeLanguage = (newLanguage) => {
    router.push('/settings/account', { locale: newLanguage });
  }

  return (
    <div className="min-h-screen justify-center">
      <NavBar />
      <div className="mx-auto flex flex-col gap-5 px-4 pt-20 pb-32 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="text-lg font-bold text-gray-800 sm:text-2xl">
            {t('accountSectionTitle')}
          </h1>
          <div className="flex flex-col items-right md:items-start w-full md:w-auto">
          <button
            className="rounded-2xl ml-auto w-48 md:w-auto border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
            onClick={saveChanges}
            disabled={
              currentUsername === username &&
              currentLanguage === language &&
              currentAvatar === avatar || loading
            }
          >
            <div className="flex">
              {loading && (
                  <svg className="animate-spin mr-3 ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              )}
                {t('save')}
              </div>
            </button>
            {errorMessage && (
                <div className="mt-2 text-red-500 font-bold text-center md:text-left">
                  {errorMessage}
                </div>
              )}
          </div>
            {/* TODO confirmation */}
        </div>

        <div className="flex justify-center gap-12">
          <div className="flex w-full max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">
                {t('username')}
              </label>
              <input
                className="rounded-2xl border-2 border-gray-200 px-5 py-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">{t('language')}</label>
              <select
                className="rounded-2xl border-2 border-gray-200 px-5 py-3"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="fr">{t('locales.fr')}</option>
                <option value="en">{t('locales.en')}</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-800">{t('avatar')}</label>
              <div className="flex flex-wrap gap-2 justify-center">
                {avatarSources.map((avatarSource, index) => (
                  <div
                    key={index}
                    // rounded-[15px] for beautiful rounded corners
                    className={`w-28 h-28 p-1 cursor-pointer rounded-[20px] ${
                      avatar === index
                        ? "border-2 border-blue-500"
                        : "border-2 border-gray-200"
                    } transition-colors duration-300`}
                    onClick={() =>
                      avatar !== index
                        ? setAvatar(index)
                        : setAvatar(null)
                    }
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
          <SettingsRightNav selectedTab={t('RightNav.accountSectionTitle')} />

          <BottomBar selectedTab="profile" />
        </div>
      </div>
    </div>
  );
}