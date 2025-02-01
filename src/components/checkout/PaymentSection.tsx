"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField } from "./FormField"
import { useCheckout } from "@/context/CheckoutContext"
import { useCheckoutValidation } from "@/hooks/useCheckoutValidation"
import { Lock } from "lucide-react"

export const PaymentSection = () => {
  const { state, dispatch } = useCheckout()
  const { formData } = state
  const { formatCardNumber, formatExpiryDate } = useCheckoutValidation()

  const getError = (field: string) => {
    return state.errors.find((e) => e.field === field)?.message
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format card number and expiry date as user types
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    }

    dispatch({
      type: "SET_FORM_DATA",
      payload: { [name]: formattedValue },
    })
  }

  return (
    <Card className="bg-white text-black">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          label="Card Number"
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          value={formData.cardNumber}
          onChange={handleChange}
          error={getError("cardNumber")}
          required
          autoComplete="cc-number"
          maxLength={19}
          inputMode="numeric"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Expiry Date"
            name="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleChange}
            error={getError("expiryDate")}
            required
            autoComplete="cc-exp"
            maxLength={5}
            inputMode="numeric"
          />
          <FormField
            label="CVV"
            name="cvv"
            type="password"
            placeholder="123"
            value={formData.cvv}
            onChange={handleChange}
            error={getError("cvv")}
            required
            autoComplete="cc-csc"
            maxLength={4}
            inputMode="numeric"
          />
        </div>
      </CardContent>
    </Card>
  )
}
