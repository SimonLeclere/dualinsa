'use client';

import EditPencilSvg from "/app/components/icons/EditPencilSvg";
import LogoutSvg from "/app/components/icons/LogoutSvg";
import ProfileTimeSvg from "/app/components/icons/ProfileTimeSvg";

import Link from "next/link";

export default function ProfileTopSection({ user }) {

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      {/* Avatar */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
        {user.username.charAt(0).toUpperCase()}
      </div>

      {/* User info */}
      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="text-sm text-gray-400">Étudiant</div>
          </div>
          <div className="flex items-center gap-3">
            <ProfileTimeSvg />
            <span className="text-gray-500">
              Membre depuis{" "}
              {user.creationDate.toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <Link
        href="/settings/account"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        <EditPencilSvg />
        Edit profile
      </Link>
      <Link
        href="/api/auth/signup"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-red-500 bg-red-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        <LogoutSvg />
        Deconnexion
      </Link>
    </section>
  );
}
