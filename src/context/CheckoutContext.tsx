"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
} from "react"
import {
  CheckoutState,
  PaymentStatus,
  ValidationError,
  CheckoutFormData,
} from "@/types/checkout"

type CheckoutAction =
  | { type: "SET_FORM_DATA"; payload: Partial<CheckoutFormData> }
  | { type: "SET_ERRORS"; payload: ValidationError[] }
  | { type: "SET_STATUS"; payload: PaymentStatus }
  | { type: "RESET_FORM" }

interface CheckoutContextType {
  state: CheckoutState
  dispatch: React.Dispatch<CheckoutAction>
}

const initialState: CheckoutState = {
  formData: {
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
  },
  errors: [],
  status: PaymentStatus.PENDING,
  orderItems: [],
}

const checkoutReducer = (
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      }
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      }
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      }
    case "RESET_FORM":
      return {
        ...initialState,
        orderItems: state.orderItems, // Preserve order items on reset
      }
    default:
      return state
  }
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
)

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}

export const CheckoutProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  )
}
