import { Note, NoteProps } from "../Note"

type NoteListProps = {
  data: NoteProps[] | null
}

export default function NoteList({ data }: NoteListProps) {
  return (
    <div className="flex flex-col h-[435px] space-y-6 mx-[30px]">
      <span className="text-base text-dark font-bold">Anotações</span>
      
      <div className="flex flex-col space-y-2">
        { (data?.length ?? 0) > 0 ? (
            data?.map(note => (
              <Note key={note.id} id={note.id} title={note.title} />
            ))
          ) : (
            <div className="flex w-full h-16 items-center justify-center">
              <span className="text-base text-semiLight font-semibold">
                Não há lembretes em aberto
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}