"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCheckout } from "@/context/CheckoutContext"

export const OrderSummary = () => {
  const { state } = useCheckout()
  const { orderItems } = state

  const calculations = useMemo(() => {
    const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax

    return {
      subtotal,
      tax,
      total,
    }
  }, [orderItems])

  return (
    <Card className="bg-white text-black">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orderItems.map((item, index) => (
            <div key={item.id || index} className="space-y-3">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">Quantity: {item.quantity}</span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              {index < orderItems.length - 1 && <Separator />}
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${calculations.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>${calculations.tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${calculations.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
