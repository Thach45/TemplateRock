"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import TemplateForm from "@/components/admin/template-form"
import { useLanguage } from "@/lib/i18n/language-context"

// Sample template data
const templates = [
  {
    id: 1,
    title: "Business Pro",
    category: "Business",
    price: 49,
    status: "published",
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
    description: "A modern portfolio template for creatives and designers.",
    features: ["Project showcase", "Gallery", "About me section", "Contact form", "Blog"],
    images: ["/placeholder.svg?height=600&width=800"],
    tags: ["portfolio", "creative", "gallery"],
  },
]

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [template, setTemplate] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)

    try {
      // In a real app, you would call an API to update the template
      console.log("Updating template:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to templates list
      router.push("/admin/templates")
    } catch (error) {
      console.error("Error updating template:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading template...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/admin/templates">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t("templateForm.back")}
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("templateForm.editTemplate")}</h1>
          <p className="text-muted-foreground">{t("templateForm.editOverview")}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {template && <TemplateForm template={template} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </CardContent>
      </Card>
    </div>
  )
}

