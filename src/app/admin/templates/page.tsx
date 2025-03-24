"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search, MoreHorizontal, ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
  },
  {
    id: 2,
    title: "Portfolio Plus",
    category: "Portfolio",
    price: 39,
    status: "published",
    sales: 98,
    createdAt: "2023-11-20",
  },
  {
    id: 3,
    title: "SaaS Landing",
    category: "SaaS",
    price: 59,
    status: "published",
    sales: 156,
    createdAt: "2023-12-05",
  },
  {
    id: 4,
    title: "Agency Hub",
    category: "Agency",
    price: 69,
    status: "published",
    sales: 87,
    createdAt: "2024-01-10",
  },
  {
    id: 5,
    title: "E-commerce Essential",
    category: "E-commerce",
    price: 79,
    status: "draft",
    sales: 0,
    createdAt: "2024-02-15",
  },
  {
    id: 6,
    title: "Blog Standard",
    category: "Blog",
    price: 29,
    status: "published",
    sales: 76,
    createdAt: "2024-02-28",
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null)
  const { t } = useLanguage()

  // Filter templates based on search and filters
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || template.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || template.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Handle template deletion
  const handleDeleteClick = (id: number) => {
    setTemplateToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the template
    console.log(`Deleting template with ID: ${templateToDelete}`)
    setDeleteDialogOpen(false)
    // Refresh the templates list
    // In a real app, you would update the state or refetch the data
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("templates.title")}</h1>
          <p className="text-muted-foreground">{t("templates.overview")}</p>
        </div>
        <Button asChild>
          <Link href="/admin/templates/new">
            <Plus className="mr-2 h-4 w-4" /> {t("templates.addTemplate")}
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("templates.search")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t("templates.category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("templates.allCategories")}</SelectItem>
                  <SelectItem value="business">{t("templateForm.business")}</SelectItem>
                  <SelectItem value="portfolio">{t("templateForm.portfolio")}</SelectItem>
                  <SelectItem value="saas">{t("templateForm.saas")}</SelectItem>
                  <SelectItem value="agency">{t("templateForm.agency")}</SelectItem>
                  <SelectItem value="e-commerce">{t("templateForm.ecommerce")}</SelectItem>
                  <SelectItem value="blog">{t("templateForm.blog")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t("templates.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("templates.allStatus")}</SelectItem>
                  <SelectItem value="published">{t("templates.published")}</SelectItem>
                  <SelectItem value="draft">{t("templates.draft")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">{t("templates.id")}</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("templates.template")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>{t("templates.category")}</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("templates.price")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>{t("templates.status")}</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("templates.sales")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("templates.created")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">{t("templates.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.id}</TableCell>
                      <TableCell>{template.title}</TableCell>
                      <TableCell>{template.category}</TableCell>
                      <TableCell>${template.price}</TableCell>
                      <TableCell>
                        <Badge variant={template.status === "published" ? "default" : "secondary"}>
                          {template.status === "published" ? t("templates.published") : t("templates.draft")}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.sales}</TableCell>
                      <TableCell>{template.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("templates.actions")}</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/admin/templates/${template.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {t("templates.view")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/templates/${template.id}/edit`)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              {t("templates.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(template.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t("templates.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {t("templates.noTemplatesFound")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("templates.deleteConfirmTitle")}</DialogTitle>
            <DialogDescription>{t("templates.deleteConfirmDescription")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t("templates.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {t("templates.confirmDelete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

