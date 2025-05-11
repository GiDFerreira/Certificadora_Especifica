import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputComponentProps {
    label?: string
    id: string
    type?: string
    placeholder?: string
    required?: boolean
}

const InputComponent = ({ label, id, type="text", placeholder, required }: InputComponentProps) => {
    return (
        <div className="flex flex-col gap-2">
            {label && 
                <Label htmlFor={id}>{label}</Label>
            }
            <Input id={id} type={type} placeholder={placeholder} required={required}></Input>
        </div>
    )
}

export default InputComponent;