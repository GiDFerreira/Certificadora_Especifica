import { Button } from "@/components/ui/button";

interface ButtonComponentProps {
    className?: string;
    children: React.ReactNode;
    variant?: "default" | "destructive" | "outline"  | "secondary" | "ghost" | "link";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponent = ({ className, children, variant, onClick }: ButtonComponentProps) => {
    return (
        <Button className={`${className}`} variant={variant} onClick={onClick}>
            {children}
        </Button>
    )
}

export default ButtonComponent;