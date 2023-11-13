import { useRouter } from 'next/navigation'
import { FaTag } from 'react-icons/fa'

export type NoteProps = {
  id: string;
  title: string;
  content?: string;
}

export function Note({ id, title }: NoteProps) {
  const router = useRouter()

  const onNoteClick = () => {
    router.push(`/note?id=${id}`)
  }

  return (
    <button 
      onClick={onNoteClick}
      className="flex w-full h-16 bg-light rounded-e-full">
      <div className="flex w-16 h-16 items-center justify-center text-dark">
        <FaTag />
      </div>
      <div className="flex w-full h-16 items-center">
        <span className="text-base text-dark font-semibold">{title}</span>
      </div>
    </button>
  )
}