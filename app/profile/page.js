import Navbar from "../components/NavBar";

// import { BottomBar } from "~/components/BottomBar";
// import { LeftBar } from "~/components/LeftBar";
// import { TopBar } from "~/components/TopBar";

import Link from "next/link";

import {
  SettingsGearSvg,
  ProfileTimeJoinedSvg,
  ProfileFriendsSvg,
  EditPencilSvg,
} from "../components/icons/ProfileSvg";

export default function Profile() {
  // Main component of the page Profile
  return (
    <div>
      <ProfileTopBar />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection />
        </div>
      </div>
      <div className="pt-[90px]"></div>
    </div>
  );
}

const ProfileTopBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <div className="invisible" aria-hidden={true}>
        <SettingsGearSvg />
      </div>
      <span className="text-gray-400">Profile - Maxime</span>
      <Link href="/settings/account">
        {" "}
        {/* TODO : Link to the settings account */}
        <SettingsGearSvg />
        <span className="sr-only">Settings</span>
      </Link>
    </div>
  );
};

const ProfileTopSection = () => {
  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
        {"mbegoud".charAt(0).toUpperCase()} {/* TODO : Link to the BDD */}
      </div>
      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-bold">Maxime</h1>
            {/* TODO : Link to the BDD */}
            <div className="text-sm text-gray-400">mbegoud</div>
            {/* TODO : Link to the BDD */}
          </div>
          <div className="flex items-center gap-3">
            <ProfileTimeJoinedSvg />
            <span className="text-gray-500">{`Joined December 2024`}</span>
          </div>
          <div className="flex items-center gap-3">
            <ProfileFriendsSvg />
            <span className="text-gray-500">{`0 Following / 0 Followers`}</span>
          </div>
        </div>
        {/* <Flag language={language} width={40} /> */}
        {/* TODO : Faire un fichier où il y a tout les drapeaux */}
        🇫🇷
      </div>
      <Link
        href="/settings/account"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        <EditPencilSvg />
        Edit profile
      </Link>
    </section>
  );
};
