'use client'

import { createContext, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import { useRouter, usePathname } from 'next/navigation'
import 'dotenv/config'

export type User = {
  id: number
  username: string
  name: string
  avatarURL: string
}

type RegisterData = {
  name: string
  username: string
  password: string
}

type SignInData = {
  username: string
  password: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  signIn: (data: SignInData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
}

type AuthProviderProps = { children: React.ReactNode }

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()
  const pathName = usePathname()

  const isAuthenticated = !!user
  const host = process.env.NEXT_PUBLIC_API_HOST ?? ""

  useEffect(() => {
    const { 'twt.access_token': token } = parseCookies()

    if (!token && pathName !== '/register') {
      router.replace('/')
    } else if (!isAuthenticated && !loading) {
      setLoading(true)

      const fetchData = async (accessToken: string) => {
        const myHeaders = new Headers()
        myHeaders.append('access_token', accessToken ?? '')

        const response = await fetch(`${host}/user/recover`, {
          method: 'GET',
          headers: myHeaders,
        })

        if (response.status === 200) {
          const data = await response.json()
          
          setUser({
            id: data.id,
            username: data.username,
            name: data.name,
            avatarURL: data.avatarUrl,
          })
        }

        router.replace('/main')
        setLoading(false)
      }

      fetchData(token)
    }
  }, [])

  async function signIn({ username, password }: SignInData) {
    setLoading(true)

    try {
      const response = await fetch(`${host}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.status === 200) {
        const data = await response.json()

        setCookie(undefined, 'twt.access_token', data.access_token, {
          maxAge: 60 * 60 * 1, // 1 hour
        })

        setUser({
          id: data.id,
          username: data.username,
          name: data.name,
          avatarURL: data.avatarUrl,
        })

        router.replace('/main')
      } else {
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }

  async function register({ name, username, password }: RegisterData) {
    setLoading(true)
    try {
      const response = await fetch(`${host}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, password }),
      })

      if (response.status === 200) {
        const data = await response.json()

        setCookie(undefined, 'twt.access_token', data.access_token, {
          maxAge: 60 * 60 * 1, // 1 hour
        })

        setUser({
          id: data.id,
          username: data.username,
          name: data.name,
          avatarURL: data.avatarUrl,
        })

        router.replace('/main')
      } else {
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, register }}>
      {children}
    </AuthContext.Provider>
  )
}
