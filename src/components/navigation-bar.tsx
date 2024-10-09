import Image from 'next/image'
import navPic1 from '@/public/icons/nav-icon-1.png'
import navPic2 from '@/public/icons/nav-icon-2.png'
import navPic3 from '@/public/icons/nav-icon-3.png'
import navPic4 from '@/public/icons/nav-icon-4.png'

export default function NavigationBarComponent({ onClick }) {
    return (
        <div className="grid grid-cols-4 h-[80px] w-full bg-white fixed bottom-0 content-center z-[999]">
            <div onClick={ () => onClick('inbox') }>
                <Image src={navPic1} alt={'alt'} width="24" height="24" className='m-auto' />
                <div className='text-center'>Message</div>
            </div>
            <div>
                <Image src={navPic2} alt={'alt'} width="24" height="24" className='m-auto' />
                <div className='text-center'>Dance Mates</div>
            </div>
            <div>
                <Image src={navPic3} alt={'alt'} width="24" height="24" className='m-auto' />
                <div className='text-center'>Profile</div>
            </div>
            <div onClick={ () => onClick('explore') }>
                <Image src={navPic4} alt={'alt'} width="24" height="24" className='m-auto' />
                <div className='text-center'>Explore</div>
            </div>
        </div>
    )
}