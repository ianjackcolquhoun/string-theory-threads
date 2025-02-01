"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Lock, ShoppingCart } from "lucide-react"

type CheckoutFormData = {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  postalCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

type OrderSummaryItem = {
  name: string
  price: number
  quantity: number
  image: string
  description: string
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  // Sample order data - replace with your actual data
  const orderItems: OrderSummaryItem[] = [
    {
      name: "Sample Product 1",
      price: 29.99,
      quantity: 1,
      image: "/api/placeholder/200/200",
      description: "A fantastic product description goes here",
    },
    {
      name: "Sample Product 2",
      price: 49.99,
      quantity: 2,
      image: "/api/placeholder/200/200",
      description: "Another amazing product description",
    },
  ]

  const calculateSubtotal = () => {
    return orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-transparent text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-white">Checkout</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="postalCode"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="cvv"
                      placeholder="CVV"
                      type="password"
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Middle Column - Order Items */}
          <div className="lg:col-span-4">
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderItems.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="aspect-square relative rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">
                            Quantity: {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {index < orderItems.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-3">
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Order
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
