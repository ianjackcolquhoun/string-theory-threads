"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField } from "./FormField"
import { useCheckout } from "@/context/CheckoutContext"

export const ContactSection = () => {
  const { state, dispatch } = useCheckout()
  const { formData } = state
  const error = state.errors.find((e) => e.field === "email")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: { [e.target.name]: e.target.value },
    })
  }

  return (
    <Card className="bg-white text-black">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={error?.message}
          required
          autoComplete="email"
        />
      </CardContent>
    </Card>
  )
}
