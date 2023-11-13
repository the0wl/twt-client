'use client'

import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import { Button } from '@/components/Form'
import NoteList from '@/components/NoteList'
import { useRouter } from 'next/navigation'
import { useNote } from '@/hooks/useNote'
import { parseCookies } from 'nookies'

export default function Main() {
  const { user, isAuthenticated } = useContext(AuthContext)
  const router = useRouter()
  const { getAllNotes, notes } = useNote()

  useEffect(() => {
    if (!isAuthenticated) return

    const { 'twt.access_token': token } = parseCookies()

    console.log(`getAllNotes(${JSON.stringify({ accessToken: token, userId: user?.id.toString() ?? ""})})`)
    getAllNotes({ accessToken: token, userId: user?.id.toString() ?? ""})
  }, [isAuthenticated])

  return (
    <>
      <Header user={user} />
      <div className='flex flex-col'>
        <NoteList data={notes}/>
        <Button type="button" text="Add note" onClick={
          () => router.push(`/note?new=true`)
        } />
      </div>
    </>
  )
}