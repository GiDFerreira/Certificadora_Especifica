import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import Tooltip from "../Tooltip/Tooltip";

interface LoggedUserComponent {
    image: string
    userName: string
    userEmail: string
}

const LoggedUserComponent = ({ image, userName, userEmail }: LoggedUserComponent) => {
    const initial = userName?.charAt(0).toUpperCase() || '';
    const isMobile = useIsMobile();

    return (
        <div className="flex gap-1 justify-center items-center">
            {isMobile ? ( 
                <Tooltip content={`${userName} - ${userEmail}`} className="w-[200px]">
                    <Avatar>
                        <AvatarImage src={image} />
                        <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                </Tooltip>
            ) : (
                <>
                    <Avatar>
                        <AvatarImage src={image} />
                        <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-[20px] font-semibold leading-5.5 text-[var(--darker-gray)]">{userName}</p>
                        <small className="text-sm font-regular text-[var(--darker-gray)] leading-3.5">{userEmail}</small>
                    </div>
                </>
            )}
        </div>
    )
}

export default LoggedUserComponent;