import Link from 'next/link';
import SettingsGearSvg from '@/components/icons/SettingsGearSvg';

export default function ProfileTopBar() {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <div className='w-5'></div> {/* This is a spacer to center the text */}
      <span className="text-gray-400">Profile</span>
      <Link href="/profile/settings">
        <SettingsGearSvg />
      </Link>
    </div>
  );
};
