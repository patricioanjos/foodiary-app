import { useMutation } from "@tanstack/react-query"
import { createContext, useCallback, useEffect, useState } from "react"
import { httpClient } from "../services/httpClient"
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IAuthContextValue {
    isLoggedIn: boolean
    isLoading: boolean
    signIn(params: SignInParams): Promise<void>
    signUp(params: SignUpParams): Promise<void>
    signOut(): Promise<void>
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

const TOKEN_STORAGE_KEY = 'ninja'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [isLoadingToken, setIsLoadingToken] = useState(true)

    useEffect(() => {
        async function load() {
            const data = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
            setToken(data)
            setIsLoadingToken(false)
        }

        load()
    }, [])

    useEffect(() => {
        async function run() {
            if (!token) {
                return
            }

            await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
        }

        run()
    }, [token])

    const { mutateAsync: signIn } = useMutation({
        mutationFn: async (params: SignInParams) => {
            const { data } = await httpClient.post('/signin', params)
            setToken(data.accessToken)
        }
    })

    const { mutateAsync: signUp } = useMutation({
        mutationFn: async (params: SignUpParams) => {
            const { data } = await httpClient.post('/signup', params)
            setToken(data.accessToken)
        }
    })

    const signOut = useCallback(async function() {
        setToken(null)
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token, isLoading: isLoadingToken, signIn, signUp, signOut
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}