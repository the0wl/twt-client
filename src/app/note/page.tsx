'use client'

import { NoteInput } from '@/components/Form';
import { useSearchParams, useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { AuthContext } from '@/contexts/AuthContext'
import { useNote } from '@/hooks/useNote';
import { parseCookies } from 'nookies'

export default function Note() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const { user, isAuthenticated } = useContext(AuthContext)
  const { getNote, editNote, saveNote, deleteNote, note } = useNote() 

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const newNote = searchParams.get('new')
  const id = searchParams.get('id') ?? ""

  const handleBackButton = async () => {
    try {
      const { 'twt.access_token': token } = parseCookies()

      if (newNote) {
        await saveNote({
          accessToken: token, 
          userId: user?.id.toString() ?? "",
          title, 
          content 
        })
      } else {
        await editNote({ 
          accessToken: token, 
          userId: user?.id.toString() ?? "", 
          id: note?.id ?? "", 
          title, 
          content 
        })
      }
    } finally {
      router.back()
    }
  }

  const handleDeleteButton = async () => {
    try {
      const { 'twt.access_token': token } = parseCookies()
      await deleteNote({ id, accessToken: token, userId: user?.id.toString() ?? ""})
    } finally {
      router.back()
    }
  }

  useEffect(() => {
    const fetchData = (async () => {
      const { 'twt.access_token': token } = parseCookies()
      await getNote({ id, accessToken: token, userId: user?.id.toString() ?? ""})
    })

    if (!isAuthenticated) return
    if (!id) return

    fetchData()
  }, [isAuthenticated])

  useEffect(() => {
    setTitle(note?.title ?? "")
    setContent(note?.content ?? "")
  }, [note])

  return (
    <>
      <div className="flex w-full flex-col px-3 pt-7 text-dark">
        <button className="h-10 w-11" onClick={handleBackButton}>
          <IoIosArrowRoundBack className="h-full w-full" />
        </button>
      </div>
      <div className={`flex flex-col pt-6
        ${newNote ? "min-h-[565px] max-h-[565px]" : "min-h-[484px] max-h-[484px]"}
      `}>
        {/* Nota {searchParams.get('id')} */}
        <NoteInput name="title" type="title" placeholder="Minha anotação" value={title} setValue={setTitle}/>
        <div className='overflow-y-auto min-h-[404px] max-h-[404px]'>
          <NoteInput name="content" type="text" placeholder="Dados da minha anotação" value={content} setValue={setContent}/>
        </div>
      </div>
      { !newNote && (
        <div className="flex mx-[30px] my-[26px]">
          <button 
            type="button" 
            onClick={handleDeleteButton}
            className="flex bg-red-600 w-full h-[60px] items-center justify-center rounded-full">
            <span className='font-bold text-md text-light'>
              Delete
            </span>
          </button>
        </div>
      )}
    </>
  )
}