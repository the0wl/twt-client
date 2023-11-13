'use client'


import { Input, Button } from '@/components/Form'
import { useContext, useState } from 'react'
import { ensureError } from '@/utils/ErrorHandler'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { IoIosArrowRoundBack } from 'react-icons/io'

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { register } = useContext(AuthContext)
  const router = useRouter()

  const onSubmit = async () => {
    if (isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const data = {
        name: name,
        username: username,
        password: password,
      }

      register(data)
    } catch (err) {
      const error = ensureError(err)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex w-full flex-col px-3 pt-7 text-dark">
        <button className="h-10 w-11" onClick={() => router.back()}>
          <IoIosArrowRoundBack className="h-full w-full" />
        </button>
      </div>
      <form>
        <Input name='Name' type='text' placeholder='Your name' value={name} setValue={setName} />
        <Input name='Username' type='text' placeholder='Your username' value={username} setValue={setUsername} />
        <Input name='Password' type='password' placeholder='Your password' value={password} setValue={setPassword} />
        <div className="flex justify-center">
          <span className="my-3 inline-block h-[1px] w-1/6 bg-zinc-200"></span>
        </div>   
        <Button type="button" onClick={onSubmit} text={isLoading ? 'Loading...' : 'Sign In'} />
      </form>
    </>
  )
}