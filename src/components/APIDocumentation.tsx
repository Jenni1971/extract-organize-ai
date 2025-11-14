import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function APIDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">API Documentation</h2>
        <p className="text-muted-foreground">
          Use our REST API to programmatically upload screenshots and retrieve extracted content.
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Chrome className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Browser Extension Available</h3>
            <p className="text-muted-foreground mb-4">
              Capture and extract text from any webpage with a single click. Available for Chrome, Firefox, and Edge.
            </p>
            <div className="flex gap-2">
              <Button variant="default" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Extension
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/your-repo/snap-xtract-extension" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>


      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Authentication</h3>
        <p className="mb-4">All API requests require an API key in the <code className="bg-muted px-2 py-1 rounded">X-API-Key</code> header.</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`curl -H "X-API-Key: YOUR_API_KEY" \\
  https://api.databasepad.com/functions/v1/api-get-content`}
        </pre>
      </Card>

      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Screenshot</TabsTrigger>
          <TabsTrigger value="retrieve">Retrieve Content</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">POST /api-upload</h3>
            <p className="text-muted-foreground mb-4">Upload and extract content from a screenshot</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Parameters</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><code>file</code> (required) - The screenshot file</li>
                  <li><code>extraction_type</code> (optional) - Type: general, recipe, code, text</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">cURL Example</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
{`curl -X POST \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@screenshot.png" \\
  -F "extraction_type=recipe" \\
  https://api.databasepad.com/functions/v1/api-upload`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">JavaScript Example</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
{`const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('extraction_type', 'recipe');

const response = await fetch(
  'https://api.databasepad.com/functions/v1/api-upload',
  {
    method: 'POST',
    headers: { 'X-API-Key': 'YOUR_API_KEY' },
    body: formData
  }
);

const data = await response.json();
console.log(data);`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Python Example</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
{`import requests

files = {'file': open('screenshot.png', 'rb')}
data = {'extraction_type': 'recipe'}
headers = {'X-API-Key': 'YOUR_API_KEY'}

response = requests.post(
    'https://api.databasepad.com/functions/v1/api-upload',
    files=files,
    data=data,
    headers=headers
)

print(response.json())`}
                </pre>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="retrieve" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">GET /api-get-content</h3>
            <p className="text-muted-foreground mb-4">Retrieve extracted content</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Query Parameters</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><code>id</code> (optional) - Specific content ID</li>
                  <li><code>limit</code> (optional) - Number of results (default: 10)</li>
                  <li><code>offset</code> (optional) - Pagination offset (default: 0)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">cURL Example</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
{`curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://api.databasepad.com/functions/v1/api-get-content?limit=20"`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">JavaScript Example</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
{`const response = await fetch(
  'https://api.databasepad.com/functions/v1/api-get-content?limit=20',
  {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
  }
);

const content = await response.json();
console.log(content);`}
                </pre>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Webhooks</h3>
        <p className="mb-4">Receive notifications when extraction is complete.</p>
        <div className="space-y-2 text-sm">
          <p><strong>Event:</strong> extraction.completed</p>
          <p><strong>Signature Header:</strong> X-Webhook-Signature (HMAC SHA256)</p>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs mt-4">
{`{
  "event": "extraction.completed",
  "timestamp": "2025-11-10T20:00:00Z",
  "data": {
    "id": "...",
    "screenshot_url": "...",
    "extracted_data": {...}
  }
}`}
        </pre>
      </Card>
    </div>
  );
}
