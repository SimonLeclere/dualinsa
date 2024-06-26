import Button from "/app/components/Button";
import { useSession, signIn } from "next-auth/react";

import { useRouter } from '@/navigation';
import { useTranslations } from "next-intl";

export default function LoginOrStartButtonsGroup() {
  const { data: session } = useSession();
  const router = useRouter();

  const t = useTranslations("HomePage");


  return (
    <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
      {session ? (
        <Button color="green" onClick={() => router.push("/courses")}>
          {t('startApplication')}
        </Button>
      ) : (
        <>
          <Button color="green" onClick={() => router.push("/auth/signup")}>
            {t('createAccount')}
          </Button>
          <Button color="sky" onClick={() => signIn()}>
            {t('signin')}
          </Button>
        </>
      )}
    </div>
  );
}
