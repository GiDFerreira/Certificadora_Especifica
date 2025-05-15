import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface BlogsComponentProps {
    link: string
    linkTitle: string
    description: string
}

const BlogsComponent = ({ link, linkTitle, description }: BlogsComponentProps) => {
    return (
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline">
                        <Link href={link} className="text-[var(--blue-link)] text-[16px] font-medium" target="_blank">🔗 {linkTitle}</Link>
                    </AccordionTrigger>
                    <AccordionContent>
                        {description}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
    )
}

export default BlogsComponent;