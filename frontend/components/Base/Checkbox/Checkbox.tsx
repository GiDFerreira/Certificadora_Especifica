import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxComponentProps {
    label: string;
    description?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
  }
  
  const CheckboxComponent = ({
    label,
    description,
    checked,
    onCheckedChange,
    disabled,
    className,
  }: CheckboxComponentProps) => {
    return (
      <div className={`flex items-start gap-2 ${className}`}>
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <div className="flex flex-col">
          <Label className="font-medium">{label}</Label>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </div>
    );
};
  
export default CheckboxComponent;
  