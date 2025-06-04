import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface CardComponentProps {
    title?: string,
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
}

const CardComponent = ({ title, description, children, footer, className }: CardComponentProps) => {
    return (
        <Card className={`${className}`}>
            {title && 
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && 
                        <CardDescription>{description}</CardDescription>
                    }
                </CardHeader>
            }
            <CardContent>
                {children}
            </CardContent>
            {footer && 
                <CardFooter>
                    {footer}
                </CardFooter>
            }
        </Card>
    )
}

export default CardComponent;