import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface TooltipComponentProps {
    children: React.ReactNode
    content: string
    className?: string
}

const TooltipComponent = ({ children, content, className }: TooltipComponentProps) => {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={`w-[300px] ${className}`}>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipComponent;