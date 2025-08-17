import { createContext, useCallback } from "react"

interface IAuthContextValue {
    isLoggedIn: boolean
    isLoading: boolean
    signIn(params: SignInParams): Promise<void>
    signUp(params: SignUpParams): Promise<void>
}

type SignInParams = {
    email: string
    password: string
}

type SignUpParams = {
    goal: string
    gender: string
    birthDate: string
    activityLevel: number
    height: number
    weight: number
    account: {
        name: string
        email: string
        password: string
    }
}

export const AuthContext = createContext({} as IAuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const signIn = useCallback(async (params: SignInParams) => {
        console.log(params)
    }, [])

    const signUp = useCallback(async (params: SignUpParams) => {
        console.log(params)
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn: false, isLoading: false, signIn, signUp
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}