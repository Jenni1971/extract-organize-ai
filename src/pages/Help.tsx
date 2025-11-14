import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Help() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help & FAQ</h1>

        <Card className="p-4 mb-6">
          <Input placeholder="Search for help..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </Card>

        <Card className="p-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I upload screenshots?</AccordionTrigger>
              <AccordionContent>
                Click the Capture button, then drag and drop your screenshots or click to browse files.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What file formats are supported?</AccordionTrigger>
              <AccordionContent>
                We support JPG, PNG, and PDF files up to 10MB each.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does the extraction work?</AccordionTrigger>
              <AccordionContent>
                We use AI-powered OCR to detect and extract text from your screenshots automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I export my data?</AccordionTrigger>
              <AccordionContent>
                Yes! Go to Export Center to download your data in PDF, Markdown, JSON, or CSV format.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I connect cloud storage?</AccordionTrigger>
              <AccordionContent>
                Visit Cloud Sync page and click Connect for Google Drive, Dropbox, or OneDrive.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
