'use client'

import Logo from '@/components/Logo'
import { Input, Button } from '@/components/Form'
import { useContext, useState } from 'react'
import { ensureError } from '@/utils/ErrorHandler'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { signIn } = useContext(AuthContext)
  const router = useRouter()

  const onSubmit = () => {
    if (isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const data = {
        username: username ?? "",
        password: password ?? "",
      }

      signIn(data)
    } catch (err) {
      const error = ensureError(err)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Logo />
      <form>
        <Input name='Username' type='text' placeholder='Your username' value={username} setValue={setUsername} />
        <Input name='Password' type='password' placeholder='Your password' value={password} setValue={setPassword} />
        <div className="flex justify-center">
          <span className="my-3 inline-block h-[1px] w-1/6 bg-zinc-200"></span>
        </div>   
        <Button type="button" onClick={onSubmit} text={isLoading ? 'Loading...' : 'Sign In'} />
      </form>
      <div className="flex mx-[30px] pb-[26px]">
        <button 
          type="button" 
          onClick={
            () => router.push(`/register`)
          }
          className="flex border-2 border-semiDark w-full h-[60px] items-center justify-center rounded-full">
          <span className='font-bold text-md text-semiDark'>
            Register
          </span>
        </button>
      </div>
    </>
  )
}