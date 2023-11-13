import { useState } from "react";

type NewNote = { 
  accessToken: string;
  userId: string; 
  title: string;
  content: string;
}

type Note = { 
  accessToken: string;
  userId: string;
  id: string; 
  title: string;
  content: string;
}

type GetAllNotesDataType = {
  accessToken: string;
  userId: string;
}

type GetNoteDataType = { 
  id: string; 
  accessToken: string;
  userId: string;
}

export const useNote = () => {
  const host = process.env.NEXT_PUBLIC_API_HOST ?? ""

  const [isLoading, setLoading] = useState(true);
  const [note, setNote] = useState<Note | null>(null)
  const [notes, setNotes] = useState<Note[] | null>([])

  const getAllNotes = async ({ accessToken, userId }: GetAllNotesDataType) => {
    setLoading(true)

    try {
      const myHeaders = new Headers()
      myHeaders.append('access_token', accessToken ?? '')
      myHeaders.append('user_id', userId ?? '')

      const response = await fetch(`${host}/note/read`, {
        method: 'GET',
        headers: myHeaders,
      })

      if (response.status === 200) {
        const data = await response.json()

        setNotes([...data])
      }
    } finally {
      setLoading(false)
    }
  }

  const getNote = async ({ id, accessToken, userId }: GetNoteDataType) => {
    setLoading(true)

    try {
      const myHeaders = new Headers()
      myHeaders.append('access_token', accessToken ?? '')
      myHeaders.append('user_id', userId ?? '')

      const response = await fetch(`${host}/note/${id}`, {
        method: 'GET',
        headers: myHeaders,
      })

      if (response.status === 200) {
        const data = await response.json()

        setNote(data)
      }
    } finally {
      setLoading(false)
    }
  }

  const saveNote = async ({ accessToken, userId, title, content } : NewNote) => {
    setLoading(true)

    try {
      const response = await fetch(`${host}/note/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
          user_id: userId,
          title,
          content
        })
      })

      if (response.status === 200) {
        const data = await response.json()

        setNote(data)
      }
    } finally {
      setLoading(false)
    }
  }

  const editNote = async ({ accessToken, userId, id, title, content } : Note) => {
    setLoading(true)

    try {
      const myHeaders = new Headers()
      myHeaders.append('access_token', accessToken ?? '')
      myHeaders.append('user_id', userId ?? '')
      myHeaders.append('title', title ?? '')
      myHeaders.append('content', content ?? '')

      const response = await fetch(`${host}/note/${id}`, {
        method: 'PUT',
        headers: myHeaders,
      })

      if (response.status === 200) {
        const data = await response.json()

        setNote(data)
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async ({ accessToken, userId, id } : GetNoteDataType) => {
    setLoading(true)

    try {
      const myHeaders = new Headers()
      myHeaders.append('access_token', accessToken ?? '')
      myHeaders.append('user_id', userId ?? '')
      
      const response = await fetch(`${host}/note/${id}`, {
        method: 'DELETE',
        headers: myHeaders,
      })

      if (response.status === 200) {
        const data = await response.json()

        setNote(null)
      }
    } finally {
      setLoading(false)
    }
  }
  
  return {
    getAllNotes,
    getNote,
    saveNote,
    editNote,
    deleteNote,
    notes,
    note,
    isLoading,
  };
};