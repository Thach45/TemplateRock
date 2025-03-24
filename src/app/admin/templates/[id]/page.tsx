"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Pencil, ExternalLink, Tag } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

// Sample template data
const templates = [
  {
    id: 1,
    title: "Business Pro",
    category: "Business",
    price: 49,
    status: "published",
    sales: 124,
    createdAt: "2023-10-15",
    description: "A professional business template for corporate websites and landing pages.",
    features: ["Responsive design", "Contact form", "About page", "Services section", "Testimonials"],
    images: ["/placeholder.svg?height=600&width=800"],
    tags: ["responsive", "business", "corporate"],
  },
  {
    id: 2,
    title: "Portfolio Plus",
    category: "Portfolio",
    price: 39,
    status: "published",
    sales: 98,
    createdAt: "2023-11-20",
    description: "A modern portfolio template for creatives and designers.",
    features: ["Project showcase", "Gallery", "About me section", "Contact form", "Blog"],
    images: ["/placeholder.svg?height=600&width=800"],
    tags: ["portfolio", "creative", "gallery"],
  },
]

export default function TemplateDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [template, setTemplate] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    // In a real app, you would fetch the template data from an API
    const fetchTemplate = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Find template by ID
        const foundTemplate = templates.find((t) => t.id === Number.parseInt(params.id))

        if (foundTemplate) {
          setTemplate(foundTemplate)
        } else {
          // Handle template not found
          router.push("/admin/templates")
        }
      } catch (error) {
        console.error("Error fetching template:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplate()
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading template...</p>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Template not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href="/admin/templates">
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t("templateForm.back")}
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{template.title}</h1>
            <p className="text-muted-foreground">{t("templateDetails.overview")}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/templates/${template.id}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("templateDetails.viewLive")}
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/templates/${template.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              {t("templateDetails.editTemplate")}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{t("templateDetails.preview")}</h2>
                <div className="rounded-lg overflow-hidden border">
                  <Image
                    src={template.images[0] || "/placeholder.svg"}
                    alt={template.title}
                    width={800}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("templateDetails.description")}</h2>
                <p className="text-muted-foreground">{template.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("templateDetails.features")}</h2>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {template.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("templateDetails.tags")}</h2>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">{t("templateDetails.details")}</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("templateDetails.id")}</span>
                    <span className="font-medium">{template.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("templateDetails.category")}</span>
                    <span className="font-medium">{template.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("templateDetails.price")}</span>
                    <span className="font-medium">${template.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("templateDetails.status")}</span>
                    <Badge variant={template.status === "published" ? "default" : "secondary"}>
                      {template.status === "published" ? t("templates.published") : t("templates.draft")}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("templateDetails.sales")}</span>
                    <span className="font-medium">{template.sales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("templateDetails.created")}</span>
                    <span className="font-medium">{template.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h2 className="text-xl font-semibold mb-4">{t("templateDetails.actions")}</h2>
                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link href={`/admin/templates/${template.id}/edit`}>
                      <Pencil className="h-4 w-4 mr-2" />
                      {t("templateDetails.editTemplate")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/templates/${template.id}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("templateDetails.viewLive")}
                    </Link>
                  </Button>
                  <Button variant="destructive" className="w-full">
                    {t("templateDetails.deleteTemplate")}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

