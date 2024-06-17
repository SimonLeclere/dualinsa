
export default function ProfileTopBar() {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-center border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <span className="text-gray-400">Profile</span>
      {/* <Link href="/settings/account">
        <SettingsGearSvg />
        <span className="sr-only">Settings</span>
      </Link> */}
    </div>
  );
};
