import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "lucide-react";

interface AccordionLinkItem {
  title: string;
  link: string;
  description: string;
}

interface AccordionComponentProps {
  items: AccordionLinkItem[];
}

const AccordionComponent = ({ items }: AccordionComponentProps) => {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-[var(--blue-link)] hover:underline text-base">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Link className="text-black" size={16}/> <span>{item.title}</span> 
            </a>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            {item.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
