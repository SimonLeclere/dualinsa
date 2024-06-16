import Button from "@/components/Button";
import { useSession, signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function LoginOrStartButtonsGroup() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
      {session ? (
        <Button color="green" onClick={() => router.push("/courses")}>
          Lancer l&apos;application
        </Button>
      ) : (
        <>
          <Button color="green" onClick={() => router.push("/auth/signup")}>
            Créer un compte
          </Button>
          <Button color="sky" onClick={() => signIn()}>
            Se connecter
          </Button>
        </>
      )}
    </div>
  );
}
