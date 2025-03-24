"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data for templates
const templates = [
  {
    id: 1,
    title: "Business Pro",
    category: "Business",
    price: 49,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.8,
    reviews: 124,
    tags: ["responsive", "dark mode", "blog"],
  },
  {
    id: 2,
    title: "Portfolio Plus",
    category: "Portfolio",
    price: 39,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.7,
    reviews: 98,
    featured: true,
    tags: ["responsive", "animations", "gallery"],
  },
  {
    id: 3,
    title: "SaaS Landing",
    category: "SaaS",
    price: 59,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.9,
    reviews: 156,
    tags: ["responsive", "dark mode", "pricing table"],
  },
  {
    id: 4,
    title: "Agency Hub",
    category: "Agency",
    price: 69,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.6,
    reviews: 87,
    tags: ["responsive", "animations", "testimonials"],
  },
  {
    id: 5,
    title: "E-commerce Essential",
    category: "E-commerce",
    price: 79,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.5,
    reviews: 112,
    tags: ["responsive", "product gallery", "cart"],
  },
  {
    id: 6,
    title: "Blog Standard",
    category: "Blog",
    price: 29,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.4,
    reviews: 76,
    tags: ["responsive", "dark mode", "newsletter"],
  },
  {
    id: 7,
    title: "Startup Launch",
    category: "Business",
    price: 49,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.7,
    reviews: 93,
    tags: ["responsive", "animations", "contact form"],
  },
  {
    id: 8,
    title: "Creative Portfolio",
    category: "Portfolio",
    price: 45,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.8,
    reviews: 108,
    tags: ["responsive", "gallery", "animations"],
  },
]

// Categories for filtering
const categories = ["All", "Business", "Portfolio", "SaaS", "Agency", "E-commerce", "Blog"]

// Features for filtering
const features = [
  "Responsive Design",
  "Dark Mode",
  "Animations",
  "Blog Section",
  "Contact Form",
  "Gallery",
  "Pricing Table",
  "Testimonials",
  "Newsletter",
]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filter templates based on search, category, and features
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory

    const matchesFeatures =
      selectedFeatures.length === 0 ||
      selectedFeatures.some((feature) => {
        const featureLower = feature.toLowerCase()
        return template.tags.some((tag) => tag.toLowerCase().includes(featureLower))
      })

    return matchesSearch && matchesCategory && matchesFeatures
  })

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return b.reviews - a.reviews // Default to featured (by popularity)
    }
  })

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Danh sách Templates</h1>
        <p className="text-muted-foreground max-w-3xl">
          Tất cả các mẫu đều được tối ưu hóa cho
          hiệu suất và khả năng tương thích trên nhiều thiết bị. Duyệt qua các danh mục và tính năng để tìm mẫu hoàn hảo cho
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Filter className="h-4 w-4" /> Lọc
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Nổi bật</SelectItem>
              <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
              <SelectItem value="price-high">Price: Cao đến thấp</SelectItem>
              <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Danh mục</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-2 ${
                        selectedCategory === category ? "bg-muted font-medium" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Chức năng</h3>
              <div className="space-y-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <label
                      htmlFor={`feature-${feature}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {selectedCategory !== "All" || selectedFeatures.length > 0 || searchQuery ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory("All")
                  setSelectedFeatures([])
                  setSearchQuery("")
                }}
              >
                Đặt lại
              </Button>
            ) : null}
          </div>
        </div>

        {/* Filters - Mobile */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 bg-background z-50 p-4 md:hidden overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-6">
              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start px-2 ${
                              selectedCategory === category ? "bg-muted font-medium" : ""
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="features">
                  <AccordionTrigger>Features</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-feature-${feature}`}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                          />
                          <label
                            htmlFor={`mobile-feature-${feature}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex gap-4 pt-4">
                {selectedCategory !== "All" || selectedFeatures.length > 0 || searchQuery ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory("All")
                      setSelectedFeatures([])
                      setSearchQuery("")
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : null}
                <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Templates Grid */}
        <div className="flex-1">
          {sortedTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTemplates.map((template) => (
                <Card key={template.id} className="group overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {template.featured && <Badge className="absolute top-2 left-2 z-10">Featured</Badge>}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
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
                      <span>{template.reviews} đánh giá</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <Link href={`/templates/${template.id}`}>Xem thử</Link>
                      </Button>
                      <Button size="sm" className="w-full">
                        Mua ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All")
                  setSelectedFeatures([])
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

