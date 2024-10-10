import { Heart } from 'lucide-react'
import Image from 'next/image'

export default function UserShortInfoComponent({ user, onSelect }) {
    return (
        <div className="w-full p-2 absolute bottom-[80px] z-[998]">
            <div className='bg-white rounded-xl p-5 flex gap-5' onClick={() => onSelect(user)}>
                <Image src={user.image} alt={'alt'} width={74} height={74} className='rounded-full h-[74px]' />
                <div className="flex flex-grow flex-col">
                    <div className='flex items-center gap-2'>
                        <div className='font-semibold text-xs'>{user.name}</div>
                        { user.pro && <div className='text-white text-xs bg-[#FF6F3C] px-3 py-1 rounded-full'>Pro</div> }
                        <Heart className='w-4 h-4 stroke-[#FF6F3C]' />
                    </div>
                    <div>
                        {user.title}
                    </div>
                    <div>
                        Salsa {user.salsa}
                    </div>
                </div>
            </div>
        </div>
    )
}