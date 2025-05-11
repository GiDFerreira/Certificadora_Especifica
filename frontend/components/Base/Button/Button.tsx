import { Button } from "@/components/ui/button";

interface ButtonComponentProps {
    className?: string;
    children: React.ReactNode;
    variant?: "default" | "destructive" | "outline"  | "secondary" | "ghost" | "link";
}

const ButtonComponent = ({ className, children, variant }: ButtonComponentProps) => {
    return (
        <Button className={`${className}`} variant={variant}>
            {children}
        </Button>
    )
}

export default ButtonComponent;