"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import TemplateForm from "@/components/admin/template-form"
import { useLanguage } from "@/lib/i18n/language-context"

export default function NewTemplatePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)

    try {
      // In a real app, you would call an API to create the template
      console.log("Creating new template:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to templates list
      router.push("/admin/templates")
    } catch (error) {
      console.error("Error creating template:", error)
    } finally {
      setIsSubmitting(false)
    }
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
          <h1 className="text-3xl font-bold tracking-tight">{t("templateForm.createNew")}</h1>
          <p className="text-muted-foreground">{t("templateForm.createOverview")}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <TemplateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  )
}

