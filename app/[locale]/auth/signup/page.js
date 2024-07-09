'use client'

import { useState } from "react";
import { useRouter } from '@/navigation';

import { randomBytes, pbkdf2Sync } from "crypto";

import { Link } from "@/navigation";
import CloseSvg from "/app/components/icons/CloseSvg";
import Button from "/app/components/Button";

import { useTranslations } from "next-intl";

export default function Signup({ params }) {

    const t = useTranslations("Auth.Signup");    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError(t('fieldsMissingError'));
            return;
        }

        if (password !== passwordConfirm) {
            setError(t('passwordsNotMatchingError'));
            return;
        }

        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    

        const response = await fetch(`/${params.locale}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                hashedPassword: hash,
                salt
            })
        })

        if (response.ok) {
            router.push('/auth/signin');
            return;
        }

        const data = await response.json();
        setError(data.message);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <main className="fixed inset-0 z-30 flex flex-col bg-white p-7 transition duration-300">
            <header className="flex flex-row-reverse justify-between sm:flex-row">
                <Link
                    className="flex text-gray-400"
                    href="/"
                >
                    <CloseSvg />
                </Link>

                <Button
                    color="link"
                    className="hidden sm:block"
                    onClick={() => router.push('/auth/signin')}
                >
                    {t('login')}
                </Button>

            </header>

            <div className="flex grow items-center justify-center">
                <div className="flex w-full flex-col gap-5 sm:w-96">
                    <h2 className="text-center text-2xl font-bold text-gray-800">
                        {t('createAccount')}
                    </h2>

                    <div className="flex flex-col gap-2 text-black">
                        <input
                            className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                            placeholder={t('usernamePlaceholder')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <input
                            className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                            placeholder={t('passwordPlaceholder')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <input
                            className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                            placeholder={t('confirmPasswordPlaceholder')}
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            onKeyDown={handleKeyPress}

                        />
                    </div>

                    <Button
                        color="sky"
                        onClick={handleSubmit}
                    >
                        {t('createAccount')}
                    </Button>

                    {
                        error ?
                            <p className="text-red-500 text-center">
                                {error}
                            </p>
                        :
                            null
                    }

                    <p className="block text-center sm:hidden">
                        <span className="text-sm font-bold text-gray-700">
                            {t('alreadyHaveAnAccount')}
                        </span>{" "}
                        <button
                            className="text-sm font-bold uppercase text-blue-400"
                            onClick={() => router.push('/auth/signin')}
                        >
                            {t('signin')}
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
};