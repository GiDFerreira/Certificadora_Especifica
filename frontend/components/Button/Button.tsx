import { Button } from "@/components/ui/button";

interface ButtonComponentProps {
    className?: string;
    children: React.ReactNode;
    variant?: "default" | "destructive" | "outline"  | "secondary" | "ghost" | "link";
    type?: "button" | "submit" | "reset"
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponent = ({ className, children, variant, type = "button", onClick }: ButtonComponentProps) => {
    return (
        <Button className={`${className}`} variant={variant} onClick={onClick} type={type}>
            {children}
        </Button>
    )
}

export default ButtonComponent;