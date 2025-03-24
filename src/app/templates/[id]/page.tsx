import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Download, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample template data
const template = {
  id: 2,
  title: "Portfolio Plus",
  category: "Portfolio",
  price: 39,
  image: "/placeholder.svg?height=600&width=800",
  rating: 4.7,
  reviews: 98,
  featured: true,
  tags: ["responsive", "animations", "gallery"],
  description:
    "A modern, responsive portfolio template perfect for creatives, designers, and photographers. Showcase your work with style and elegance.",
  features: [
    "Fully responsive design",
    "Interactive animations",
    "Gallery with lightbox",
    "Contact form with validation",
    "Blog section",
    "Dark mode support",
    "SEO optimized",
    "Fast loading speed",
    "Easy customization",
    "Detailed documentation",
  ],
  includes: ["Next.js source code", "Tailwind CSS styling", "Responsive images", "Free updates", "6 months support"],
  faqs: [
    {
      question: "Do I need coding knowledge to use this template?",
      answer:
        "Basic knowledge of React and Next.js is recommended to customize the template. However, we provide detailed documentation to help you get started even if you're a beginner.",
    },
    {
      question: "Can I use this template for multiple projects?",
      answer:
        "Each purchase allows you to use the template for a single end product. If you want to use it for multiple projects, you'll need to purchase additional licenses.",
    },
    {
      question: "Do you offer customization services?",
      answer:
        "Yes, we offer customization services at an additional cost. Please contact our support team for more information.",
    },
    {
      question: "What's your refund policy?",
      answer:
        "We offer a 14-day money-back guarantee if the template doesn't work as described. Please contact our support team if you encounter any issues.",
    },
  ],
  screenshots: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  relatedTemplates: [1, 3, 8],
}

// Sample related templates
const relatedTemplates = [
  {
    id: 1,
    title: "Business Pro",
    category: "Business",
    price: 49,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 3,
    title: "SaaS Landing",
    category: "SaaS",
    price: 59,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 8,
    title: "Creative Portfolio",
    category: "Portfolio",
    price: 45,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.8,
    reviews: 108,
  },
]

export default function TemplateDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8">
        <Link href="/templates" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{template.title}</h1>
            <div className="flex items-center mt-2">
              <Badge>{template.category}</Badge>
              <div className="flex items-center ml-4 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span>{template.rating}</span>
                <span className="mx-2">•</span>
                <span>{template.reviews} reviews</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">${template.price}</p>
            <Button className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="preview">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-0">
              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.title}
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </TabsContent>
            <TabsContent value="screenshots" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border">
                    <Image
                      src={screenshot || "/placeholder.svg"}
                      alt={`${template.title} screenshot ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-muted-foreground mb-6">{template.description}</p>

            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {template.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4">What's Included</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {template.includes.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="mb-6">
              {template.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div>
          <div className="sticky top-24 space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Template Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{template.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">First Released</span>
                  <span className="font-medium">June 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">March 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Framework</span>
                  <span className="font-medium">Next.js 14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Responsive</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documentation</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <Button className="w-full flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download Demo
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Have questions about this template? Contact our support team for assistance.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedTemplates.map((template) => (
            <div key={template.id} className="group overflow-hidden border rounded-lg flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{template.title}</h3>
                    <p className="text-sm text-muted-foreground">{template.category}</p>
                  </div>
                  <p className="font-bold">${template.price}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span>{template.rating}</span>
                  </div>
                  <span className="mx-2">•</span>
                  <span>{template.reviews} reviews</span>
                </div>
                <div className="mt-auto pt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href={`/templates/${template.id}`}>Preview</Link>
                  </Button>
                  <Button size="sm" className="w-full">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

