import Link from "next/link";
import EditPencilSvg from "/app/components/icons/EditPencilSvg";
import LogoutSvg from "@/components/icons/LogoutSvg";

export default function ProfileTopBar() {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <Link
        href="/settings/account"
        className="flex h-11 w-12 items-center justify-center gap-2 rounded-2xl border-b-4 border-blue-500 bg-blue-400 font-bold uppercase text-white transition hover:brightness-110"
      >
        <EditPencilSvg />
      </Link>

      <span className="text-gray-400 flex-1 text-center">Profile</span>

      <Link
        href="/api/auth/signup"
        className="flex h-11 w-12 items-center justify-center gap-2 rounded-2xl border-b-4 border-red-500 bg-red-400 font-bold uppercase text-white transition hover:brightness-110"
      >
        <LogoutSvg />
      </Link>
    </div>
  );
}
