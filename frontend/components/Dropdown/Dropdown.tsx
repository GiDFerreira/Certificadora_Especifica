import { MoreHorizontal } from "lucide-react";
import Button from "../Button/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Action } from "@/interfaces/Action";

interface DropdownComponentProps {
    label: string
    actions: Action[]
}

const DropdownComponent = ({ label, actions }: DropdownComponentProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {label}
                </DropdownMenuLabel>
                {actions.map((action, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={action.onClick}
                        className="flex items-center gap-2"
                    >
                        {action.icon && <span>{action.icon}</span>}
                        {action.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownComponent;