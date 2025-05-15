import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface TooltipComponentProps {
    children: React.ReactNode
    content: string
}

const TooltipComponent = ({ children, content }: TooltipComponentProps) => {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="w-[300px]">
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipComponent;