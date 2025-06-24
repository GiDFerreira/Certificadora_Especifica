import { HTMLAttributes } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface CardComponentProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const CardComponent = ({
  title,
  description,
  children,
  footer,
  className,
  ...rest // ← aqui capturamos onClick e cia
}: CardComponentProps) => {
  return (
    <Card className={`${className}`} {...rest}> {/* ← repassamos os eventos */}
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default CardComponent;
