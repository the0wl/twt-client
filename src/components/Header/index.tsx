import { User } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { IoIosInformationCircle } from 'react-icons/io'

type HeaderProps = {
  user: User | null
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()

  return (
    <div className="flex h-20 mx-[30px] my-[18px]">
      <div className="flex grow-0 w-20 h-20 items-center justify-center mr-4">
        <img 
          className='w-16 h-16 rounded-full'
          src={user?.avatarURL ? user?.avatarURL : `https://ui-avatars.com/api/?name=${user?.name}&size=28&background=0B3948&bold=true&color=D9DBF1&rounded=true`} />
      </div>
      <div className="flex grow flex-col min-w-[150px] h-20">
        <div className="flex h-10 items-end">
          <span className="text-base font-semibold text-dark truncate">
            {user?.name}
          </span>
        </div>
        <div className="flex grow-0 h-10 items-start">
          <span className="text-sm font-light text-neutral truncate">
            {user?.username}
          </span>
        </div>
      </div>
      <button 
        onClick={() => router.push(`/about`)}
        className="flex w-[42px] h-20 items-center justify-center text-dark">
        <IoIosInformationCircle size={42}/>
      </button>
    </div>
  )
}
