"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample cart items
const initialCartItems = [
  {
    id: 2,
    title: "Portfolio Plus",
    category: "Portfolio",
    price: 39,
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "SaaS Landing",
    category: "SaaS",
    price: 59,
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Handle checkout
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect to success page
      window.location.href = "/checkout/success"
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <Link href="/templates" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded overflow-hidden shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                            <p className="font-bold">${item.price}</p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" /> Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card" className="mt-0">
                  <form onSubmit={handleCheckout}>
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <Input id="card-name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-6">
                      <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john.doe@example.com" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" placeholder="John" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" placeholder="Doe" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="123 Main St" required />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2 col-span-1">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" placeholder="New York" required />
                            </div>
                            <div className="space-y-2 col-span-1">
                              <Label htmlFor="state">State</Label>
                              <Select defaultValue="NY">
                                <SelectTrigger id="state">
                                  <SelectValue placeholder="State" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NY">New York</SelectItem>
                                  <SelectItem value="CA">California</SelectItem>
                                  <SelectItem value="TX">Texas</SelectItem>
                                  <SelectItem value="FL">Florida</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2 col-span-1">
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input id="zip" placeholder="10001" required />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="paypal" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <p className="mb-4">You will be redirected to PayPal to complete your purchase.</p>
                        <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
                          {isProcessing ? "Processing..." : "Continue to PayPal"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 flex items-center gap-2"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" /> Complete Purchase
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By completing your purchase, you agree to our{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any templates to your cart yet.</p>
          <Button asChild>
            <Link href="/templates">Browse Templates</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

