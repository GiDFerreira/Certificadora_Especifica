
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

interface TextAreaComponentProps {
    label?: string
    id: string
    type?: string
    placeholder?: string
    required?: boolean
    className?: string
    value?: string
    maxLength?: number
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextAreaComponent = ({ label, id, type="text", placeholder, required, className, value, maxLength, onChange }: TextAreaComponentProps) => {
    return (
        <div className="flex flex-col gap-2">
            {label && 
                <Label htmlFor={id}>{label}</Label>
            }
            <Textarea id={id} placeholder={placeholder} required={required} onChange={onChange} className={`${className}`} value={value} maxLength={maxLength}></Textarea>
        </div>
    )
}

export default TextAreaComponent;