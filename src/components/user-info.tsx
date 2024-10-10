// @ts-nocheck

import Image from "next/image";
import { Heart } from 'lucide-react'
import { Button } from "./ui/button";

export default function UserInfo({user, onChat}) {
    return <div className="w-full h-full z-[999] bg-white absolute flex flex-col">
        <div style={{
            background: 'url('+ user.image + ')',
            backgroundSize: 'cover'
        }}>
            <Image src={user.image} alt='' width={200} height={200} className="m-auto opacity-0"/>
        </div>
        <div className="bg-[#FFE7DF] text-center">{user.title}</div>

        <div className="p-3 flex-grow overflow-scroll">
            <div className='flex items-center gap-2'>
                <div className='font-semibold text-2xl'>{user.name}</div>
                <div className="flex-grow"> </div>
                { user.pro && <div className='text-white text-md bg-[#FF6F3C] px-3 py-1 rounded-full'>Pro</div> }
                {/* <Heart className='w-4 h-4 stroke-[#FF6F3C]' /> */}
            </div>
            <p className="mt-5">
                {user.bio}
            </p>

            <div className="mt-8">
                <div className="font-semibold">Dance type</div>
                <div>
                    <div className="flex gap-2">
                        <div>Salsa</div>
                        <div className="flex-grow"><span className="text-[#FF6F3C]">Role:</span> Folower</div>
                        <div className='flex gap-2'>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#EBEAEA] w-[12px] h-[12px]"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <div>Bachata</div>
                        <div className="flex-grow"><span className="text-[#FF6F3C]">Role:</span> Folower, Leader</div>
                        <div className='flex gap-2'>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#EBEAEA] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#EBEAEA] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#EBEAEA] w-[12px] h-[12px]"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <div>West coast swing</div>
                        <div className="flex-grow"><span className="text-[#FF6F3C]">Role:</span> Folower</div>
                        <div className='flex gap-2'>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#FF6F3C] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#EBEAEA] w-[12px] h-[12px]"></div>
                            <div className="rounded-full bg-[#EBEAEA] w-[12px] h-[12px]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="font-semibold">Next festival I'm going</div>
                <div>
                    <div className="text-lg font-semibold">Ecstatic Dance Amsterdam - Odessa Amsterdam</div>
                    9-12 Oct | Amsterdam | <a className="decoration-solid text-blue-500" href="#">Event Website</a>
                </div>
            </div>

            <div className="mt-8 flex gap-2 mb-[80px]">
                <Button className="bg-[#FF6F3C] text-white h-[54px] flex-grow text-lg" onClick={() => onChat(user)}>Send a message</Button>
                <Button className="bg-[#FF6F3C] hover:bg-[#FF6F3C] text-white h-[54px] w-[54px]">
                    <Heart className='w-6 h-6 stroke-white' onClick={(e) => e.target.classList.add('fill-white')} />
                </Button>
            </div>
        </div>
    </div>
}