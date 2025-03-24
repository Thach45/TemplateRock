"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, Upload, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"

interface TemplateFormProps {
  template?: any
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function TemplateForm({ template, onSubmit, isSubmitting }: TemplateFormProps) {
  const [title, setTitle] = useState(template?.title || "")
  const [category, setCategory] = useState(template?.category || "")
  const [price, setPrice] = useState(template?.price?.toString() || "")
  const [status, setStatus] = useState(template?.status || "draft")
  const [description, setDescription] = useState(template?.description || "")
  const [features, setFeatures] = useState<string[]>(template?.features || [""])
  const [images, setImages] = useState<string[]>(template?.images || [])
  const [tags, setTags] = useState<string[]>(template?.tags || [])
  const [newTag, setNewTag] = useState("")
  const { t } = useLanguage()

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !category || !price || !description || features.some((f) => !f) || !images.length) {
      alert("Please fill in all required fields")
      return
    }

    // Prepare form data
    const formData = {
      title,
      category,
      price: Number.parseFloat(price),
      status,
      description,
      features: features.filter((f) => f.trim() !== ""),
      images,
      tags,
    }

    // Submit form
    onSubmit(formData)
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, you would upload the file to a server and get a URL back
    // For this example, we'll use a placeholder
    const newImages = [...images]
    for (let i = 0; i < files.length; i++) {
      newImages.push("/placeholder.svg?height=600&width=800")
    }
    setImages(newImages)
  }

  // Handle image removal
  const handleImageRemove = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  // Handle feature addition
  const handleAddFeature = () => {
    setFeatures([...features, ""])
  }

  // Handle feature removal
  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features]
    newFeatures.splice(index, 1)
    setFeatures(newFeatures)
  }

  // Handle feature change
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  // Handle tag addition
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()])
      }
      setNewTag("")
    }
  }

  // Handle tag removal
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              {t("templateForm.title")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("templateForm.enterTitle")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              {t("templateForm.category")} <span className="text-red-500">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder={t("templateForm.selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Business">{t("templateForm.business")}</SelectItem>
                <SelectItem value="Portfolio">{t("templateForm.portfolio")}</SelectItem>
                <SelectItem value="SaaS">{t("templateForm.saas")}</SelectItem>
                <SelectItem value="Agency">{t("templateForm.agency")}</SelectItem>
                <SelectItem value="E-commerce">{t("templateForm.ecommerce")}</SelectItem>
                <SelectItem value="Blog">{t("templateForm.blog")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                {t("templateForm.price")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.99"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t("templateForm.status")}</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder={t("templateForm.selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t("templates.draft")}</SelectItem>
                  <SelectItem value="published">{t("templates.published")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              {t("templateForm.description")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("templateForm.enterDescription")}
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t("templateForm.tags")}</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove tag</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder={t("templateForm.addTag")}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>
              {t("templateForm.templateImages")} <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-md overflow-hidden border">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Template preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => handleImageRemove(index)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              ))}
              {images.length < 4 && (
                <Card className="aspect-[4/3] flex items-center justify-center border-dashed">
                  <CardContent className="p-0 flex items-center justify-center h-full">
                    <Label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">{t("templateForm.uploadImage")}</span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                {t("templateForm.features")} <span className="text-red-500">*</span>
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFeature}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t("templateForm.addFeature")}
              </Button>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`${t("templateForm.feature")} ${index + 1}`}
                    required
                  />
                  {features.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFeature(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Remove feature</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          {t("templateForm.cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("templateForm.saving") : template ? t("templateForm.update") : t("templateForm.create")}
        </Button>
      </div>
    </form>
  )
}

