'use client';

import EditPencilSvg from "/app/components/icons/EditPencilSvg";
import LogoutSvg from "/app/components/icons/LogoutSvg";
import ProfileTimeSvg from "/app/components/icons/ProfileTimeSvg";

import Link from "next/link";
import Image from "next/image";

import { useTranslations } from "next-intl";

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

const avatarSources = [ pp1, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12 ];

export default function ProfileTopSection({ user }) {

  const t = useTranslations("Profile");

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      {/* Avatar */}
      
      {
        (user.avatar || user.avatar === 0) && user.avatar >= 0 && user.avatar < avatarSources.length ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-400 md:h-44 md:w-44">
            <Image src={avatarSources[user.avatar]} alt="avatar" className="w-full h-full rounded-full" />
          </div>
        ) :
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
          {user.username.charAt(0).toUpperCase()}
        </div>
      }

      {/* User info */}
      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="text-sm text-gray-400">{t('student')}</div>
          </div>
          <div className="flex items-center gap-3">
            <ProfileTimeSvg />
            <span className="text-gray-500">
              {t('memberSince', { membershipDate: new Date(user.creationDate) })}
            </span>
          </div>
        </div>
      </div>
      <Link
        href="/settings/account"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        <EditPencilSvg />
        {t('editProfile')}
      </Link>
      <Link
        href="/api/auth/signout"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-red-500 bg-red-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        <LogoutSvg />
        {t('logout')}
      </Link>
    </section>
  );
}
