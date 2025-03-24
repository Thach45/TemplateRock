import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { LanguageProvider } from "@/lib/i18n/language-context"

export const metadata = {
  title: "Admin Dashboard - TemplateLab",
  description: "Admin dashboard for managing templates and users",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-muted/40">
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader />
            <div className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </LanguageProvider>
  )
}

