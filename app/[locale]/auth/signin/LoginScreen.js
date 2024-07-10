'use client'

import { signIn } from "next-auth/react"

import { useRouter } from '@/navigation'
import { useSearchParams } from 'next/navigation'

import { useState } from "react";

import { Link } from "@/navigation";
import Image from 'next/image'
import CloseSvg from "/app/components/icons/CloseSvg";
import Button from "/app/components/Button";

import { useTranslations } from "next-intl";

export default function LoginScreenComponent({ showInsaAuth }) {

    const t = useTranslations("Auth.Signin");
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(searchParams.get("error") ? t('usernameOrPasswordIncorrect') : "");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError(t('fieldsMissingError'));
            return;
        }

        try {
            await signIn("credentials", {
                username,
                password,
                callbackUrl: searchParams.get("callbackUrl") || "/"
            });
        }
        catch (err) {
            console.error("Login error", err);
            setError(t('usernameOrPasswordIncorrect'));
        };
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    const handleINSAAuth = async () => {

        try {
            await signIn("insa", {
                callbackUrl: searchParams.get("callbackUrl") || "/"
            })
        } catch (err) {
            console.log("INSA auth error", err);
            setError("Une erreur est survenue lors de la connexion avec INSA.");
        };
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
                    onClick={() => router.push('/auth/signup')}
                >
                    {t('createAccount')}
                </Button>

            </header>

            <div className="flex grow items-center justify-center">
                <div className="flex w-full flex-col gap-5 sm:w-96">
                    <h2 className="text-center text-2xl font-bold text-gray-800">
                        {t('login')}
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
                    </div>

                    <Button
                        color="sky"
                        onClick={handleSubmit}
                    >
                        {t('login')}
                    </Button>

                    {
                        showInsaAuth &&
                        <>
                            <p className="text-center text-gray-700">
                                {t('or')}
                            </p>
                            <Button
                                color="insa"
                                onClick={handleINSAAuth}
                                className="flex items-center justify-center gap-2"
                            >
                                Se connecter avec <Image src="/insa.png" width={60} height={24} alt="INSA" className="inline-block" />
                            </Button>
                        </>
                    }


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
                            {t('dontHaveAnAccount')}
                        </span>{" "}
                        <button
                            className="text-sm font-bold uppercase text-blue-400"
                            onClick={() => router.push('/auth/signup')}
                        >
                            {t('createAccount')}
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
};