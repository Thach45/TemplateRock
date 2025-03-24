"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, Users, ShoppingCart, MessageSquare, BarChart, Settings, LogOut } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const sidebarLinks = [
    {
      title: t("admin.dashboard"),
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: t("admin.templates"),
      href: "/admin/templates",
      icon: Package,
    },
    {
      title: t("admin.users"),
      href: "/admin/users",
      icon: Users,
    },
    {
      title: t("admin.orders"),
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: t("admin.support"),
      href: "/admin/support",
      icon: MessageSquare,
    },
    {
      title: t("admin.analytics"),
      href: "/admin/analytics",
      icon: BarChart,
    },
    {
      title: t("admin.settings"),
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-background border-r h-screen">
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center">
          <span className="text-xl font-bold">TemplateLab</span>
          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Admin</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-4 overflow-y-auto">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <link.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-muted-foreground")} />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Link
          href="/admin/logout"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3 text-muted-foreground" />
          {t("admin.logout")}
        </Link>
      </div>
    </div>
  )
}

