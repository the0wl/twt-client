'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { parseCookies } from 'nookies'
import 'dotenv/config'

type About = {
  integrantes: string;
  funcao: string;
  data: string;
}

export default function About() {
  const router = useRouter()
  const [about, setAbout] = useState<About>({
    integrantes: "",
    funcao: "",
    data: ""
  })

  const host = process.env.NEXT_PUBLIC_API_HOST ?? ""
  const port = process.env.NEXT_PUBLIC_API_PORT ?? ""

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host}:${port}/about`, {
        method: 'GET',
      })

      if (response.status === 200) {
        const data = await response.json()
        
        setAbout(data)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="flex w-full flex-col px-3 pt-7 text-dark">
        <button className="h-10 w-11" onClick={() => router.back()}>
          <IoIosArrowRoundBack className="h-full w-full" />
        </button>
      </div>
      <div className='flex flex-col pt-4'>
        <span className='mx-[30px]'><b>Integrantes:</b> {about.integrantes}</span>
        <span className='mx-[30px]'><b>O que faz:</b> {about.funcao}</span>
        <span className='mx-[30px]'><b>Última alteração:</b> {about.data}</span>
      </div>
    </>
  )
} 