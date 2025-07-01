import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

export const OpeningCrawlAccordion = ({ crawl }: { crawl: string }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="opening-crawl">
        <AccordionTrigger className="text-lg font-semibold">
          Opening Crawl
        </AccordionTrigger>
        <AccordionContent>
          <p className="whitespace-pre-line text-gray-700">{crawl}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
