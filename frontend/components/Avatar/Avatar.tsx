"use client"

import Image, { StaticImageData } from "next/image"

interface AvatarComponentProps {
    image: StaticImageData
    name: string
    username: string
}

const AvatarComponent = ({ image, name, username }: AvatarComponentProps) => {
    const handleClick = () => {
        window.open(`https://instagram.com/${username}`, '_blank')
    }

    return (
        <div className="flex gap-2 cursor-pointer justify-center items-center" onClick={handleClick}>
            <Image src={image} alt={`Foto de ${name}`} className="w-[40px] h-[40px] rounded-full border-2 border-black border-solid" />
            <div className="flex flex-col">
                <p className="text-[14px] leading-4.5 font-semibold text-[var(--darker-gray)]">{name}</p>
                <small className="text-[12px] leading-3.5 text-[var(--darker-gray)]">@{username}</small>
            </div>
        </div>
    )
}

export default AvatarComponent;