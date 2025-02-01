"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ShoppingCart } from "lucide-react"
import { ContactSection } from "@/components/checkout/ContactSection"
import { ShippingSection } from "@/components/checkout/ShippingSection"
import { PaymentSection } from "@/components/checkout/PaymentSection"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext"
import { useCheckoutValidation } from "@/hooks/useCheckoutValidation"
import { PaymentStatus } from "@/types/checkout"

const CheckoutContent = () => {
  const { state, dispatch } = useCheckout()
  const { validateForm } = useCheckoutValidation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm(state.formData)
    if (errors.length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors })
      return
    }

    try {
      dispatch({ type: "SET_STATUS", payload: PaymentStatus.PROCESSING })

      // Here you would typically:
      // 1. Tokenize the card data
      // 2. Send the payment info to your payment processor
      // 3. Create the order in your database
      // 4. Handle shipping/fulfillment

      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      dispatch({ type: "SET_STATUS", payload: PaymentStatus.COMPLETED })
      dispatch({ type: "RESET_FORM" })

      // Redirect to success page or show success message
      console.log("Order completed successfully")
    } catch (error) {
      console.error("Payment processing error:", error)
      dispatch({ type: "SET_STATUS", payload: PaymentStatus.FAILED })
      dispatch({
        type: "SET_ERRORS",
        payload: [
          {
            field: "submit",
            message:
              error instanceof Error
                ? error.message
                : "Payment failed. Please try again.",
          },
        ],
      })
    }
  }

  const isProcessing = state.status === PaymentStatus.PROCESSING

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-2">
        <ShoppingCart className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-white">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Form Sections */}
        <div className="lg:col-span-5 space-y-6">
          <ContactSection />
          <ShippingSection />
          <PaymentSection />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                Complete Order
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-7">
          <OrderSummary />
        </div>
      </div>
    </form>
  )
}

const CheckoutPage = () => {
  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-transparent text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <CheckoutContent />
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutPage
