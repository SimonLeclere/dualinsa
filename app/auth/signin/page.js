'use client'

import { signIn } from "next-auth/react"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from "react";

import Link from "next/link";
import CloseSvg from "@/components/icons/CloseSvg";
import Button from "@/components/Button";

export default function LoginScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        await signIn("credentials", {
            username,
            password,
            callbackUrl: searchParams.get("callbackUrl") || "/"
        })
        .catch(err => {
            setError("Nom d'utilisateur ou mot de passe incorrect");
        });
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
                    Créer un compte
                </Button>

            </header>

            <div className="flex grow items-center justify-center">
                <div className="flex w-full flex-col gap-5 sm:w-96">
                    <h2 className="text-center text-2xl font-bold text-gray-800">
                        Se connecter
                    </h2>

                    <div className="flex flex-col gap-2 text-black">
                        <input
                            className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                            placeholder="Mot de passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        color="sky"
                        onClick={handleSubmit}
                    >
                        Se connecter
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
                            Pas encore de compte ?
                        </span>{" "}
                        <button
                            className="text-sm font-bold uppercase text-blue-400"
                            onClick={() => router.push('/auth/signup')}
                        >
                            Créer un compte
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
};