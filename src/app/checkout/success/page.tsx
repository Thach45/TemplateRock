import Link from "next/link"
import { CheckCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 md:px-6 py-16 md:py-24">
      <Card>
        <CardContent className="p-6 md:p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Thank You for Your Purchase!</h1>
            <p className="text-muted-foreground">Your order has been successfully processed.</p>
          </div>

          <div className="border rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-medium">ORD-003</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">$98.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">Credit Card</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-4">Your Templates</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Portfolio Plus</h3>
                  <p className="text-sm text-muted-foreground">Portfolio</p>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">SaaS Landing</h3>
                  <p className="text-sm text-muted-foreground">SaaS</p>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              A confirmation email has been sent to your email address with all the details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/templates">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

