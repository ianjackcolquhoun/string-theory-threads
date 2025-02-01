"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField } from "./FormField"
import { useCheckout } from "@/context/CheckoutContext"

export const ShippingSection = () => {
  const { state, dispatch } = useCheckout()
  const { formData } = state

  const getError = (field: string) => {
    return state.errors.find((e) => e.field === field)?.message
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: { [e.target.name]: e.target.value },
    })
  }

  return (
    <Card className="bg-white text-black">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            error={getError("firstName")}
            required
            autoComplete="given-name"
          />
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            error={getError("lastName")}
            required
            autoComplete="family-name"
          />
        </div>
        <FormField
          label="Street Address"
          name="address"
          placeholder="Enter street address"
          value={formData.address}
          onChange={handleChange}
          error={getError("address")}
          required
          autoComplete="street-address"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="City"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            error={getError("city")}
            required
            autoComplete="address-level2"
          />
          <FormField
            label="Postal Code"
            name="postalCode"
            placeholder="Enter postal code"
            value={formData.postalCode}
            onChange={handleChange}
            error={getError("postalCode")}
            required
            autoComplete="postal-code"
          />
        </div>
        <FormField
          label="Country"
          name="country"
          placeholder="Enter country"
          value={formData.country}
          onChange={handleChange}
          error={getError("country")}
          required
          autoComplete="country-name"
        />
      </CardContent>
    </Card>
  )
}
