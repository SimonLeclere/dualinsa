import LogoutSvg from "/app/components/icons/LogoutSvg";

import Link from "next/link";

export default function ProfileTopSection({ user }) {
      return (
        <div>
          <Link
            href="/api/auth/signup"
            className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
          >
            <LogoutSvg />
            Deconnexion
          </Link>
        </div>
      );
    }