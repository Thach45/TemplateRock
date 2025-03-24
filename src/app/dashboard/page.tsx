import Link from "next/link"
import Image from "next/image"
import { Download, ExternalLink, FileText, MessageSquare, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
}

// Sample purchased templates
const purchasedTemplates = [
  {
    id: 2,
    title: "Portfolio Plus",
    category: "Portfolio",
    purchaseDate: "March 15, 2024",
    downloadLink: "#",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "SaaS Landing",
    category: "SaaS",
    purchaseDate: "February 28, 2024",
    downloadLink: "#",
    image: "/placeholder.svg?height=600&width=800",
  },
]

// Sample order history
const orderHistory = [
  {
    id: "ORD-001",
    date: "March 15, 2024",
    items: ["Portfolio Plus"],
    total: 39,
    status: "Completed",
  },
  {
    id: "ORD-002",
    date: "February 28, 2024",
    items: ["SaaS Landing"],
    total: 59,
    status: "Completed",
  },
]

// Sample support tickets
const supportTickets = [
  {
    id: "TKT-001",
    subject: "Installation Issue",
    date: "March 18, 2024",
    status: "Open",
  },
  {
    id: "TKT-002",
    subject: "Customization Help",
    date: "March 10, 2024",
    status: "Closed",
  },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your purchases and account</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates">
        <TabsList className="mb-8">
          <TabsTrigger value="templates">My Templates</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedTemplates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>
                    {template.category} • Purchased on {template.purchaseDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={template.downloadLink}>
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/templates/${template.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" /> View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center p-6 border-dashed">
              <div className="text-center space-y-4">
                <h3 className="font-medium">Looking for more templates?</h3>
                <p className="text-sm text-muted-foreground">Browse our collection of premium templates</p>
                <Button asChild>
                  <Link href="/templates">Browse Templates</Link>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and download invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items.join(", ")}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/orders/${order.id}`}>
                            <FileText className="h-4 w-4 mr-2" /> Invoice
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>View and manage your support requests</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/support/new">New Ticket</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            ticket.status === "Open"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/support/${ticket.id}`}>
                            <MessageSquare className="h-4 w-4 mr-2" /> View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/account">
                    <User className="h-4 w-4 mr-2" /> Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Password</h4>
                  <p className="text-sm text-muted-foreground mb-4">Last changed 3 months ago</p>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/security">Change Password</Link>
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">Not enabled</p>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/security">Enable 2FA</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

