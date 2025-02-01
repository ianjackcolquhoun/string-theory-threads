export interface CheckoutFormData {
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

export interface OrderSummaryItem {
  name: string
  price: number
  quantity: number
  image: string
  description: string
}

export interface OrderItem extends OrderSummaryItem {
  id: string
  sku: string
  variantId?: string
}

export interface ValidationError {
  field: keyof CheckoutFormData | "submit" | "general"
  message: string
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface CheckoutState {
  formData: CheckoutFormData
  errors: ValidationError[]
  status: PaymentStatus
  orderItems: OrderItem[]
}
