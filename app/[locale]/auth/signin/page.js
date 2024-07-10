import { Suspense } from 'react'
import LoginScreenComponent from './LoginScreen'

import { showInsaAuthFlag } from '@/lib/flags'

export default async function LoginScreen() {

    const showInsaAuth = await showInsaAuthFlag();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginScreenComponent showInsaAuth={showInsaAuth} />
        </Suspense>
    )
}