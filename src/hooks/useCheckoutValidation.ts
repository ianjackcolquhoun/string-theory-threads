import { CheckoutFormData, ValidationError } from "@/types/checkout"

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidCardNumber = (cardNumber: string): boolean => {
  const digitsOnly = cardNumber.replace(/\D/g, "")
  return digitsOnly.length >= 13 && digitsOnly.length <= 19
}

const isValidExpiryDate = (expiryDate: string): boolean => {
  const [month, year] = expiryDate.split("/").map(Number)
  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1

  return (
    month >= 1 &&
    month <= 12 &&
    year >= currentYear &&
    (year > currentYear || month >= currentMonth)
  )
}

const isValidCVV = (cvv: string): boolean => {
  const digitsOnly = cvv.replace(/\D/g, "")
  return digitsOnly.length >= 3 && digitsOnly.length <= 4
}

const isValidPostalCode = (postalCode: string): boolean => {
  return postalCode.length >= 3 && postalCode.length <= 10
}

export const useCheckoutValidation = () => {
  const validateForm = (data: CheckoutFormData): ValidationError[] => {
    const errors: ValidationError[] = []

    // Required field validation
    const requiredFields: (keyof CheckoutFormData)[] = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "country",
      "postalCode",
      "cardNumber",
      "expiryDate",
      "cvv",
    ]

    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors.push({
          field,
          message: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        })
      }
    })

    // Email validation
    if (data.email && !isValidEmail(data.email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address",
      })
    }

    // Postal code validation
    if (data.postalCode && !isValidPostalCode(data.postalCode)) {
      errors.push({
        field: "postalCode",
        message: "Please enter a valid postal code",
      })
    }

    // Card number validation
    if (data.cardNumber && !isValidCardNumber(data.cardNumber)) {
      errors.push({
        field: "cardNumber",
        message: "Please enter a valid card number",
      })
    }

    // Expiry date validation
    if (data.expiryDate && !isValidExpiryDate(data.expiryDate)) {
      errors.push({
        field: "expiryDate",
        message: "Please enter a valid expiry date (MM/YY)",
      })
    }

    // CVV validation
    if (data.cvv && !isValidCVV(data.cvv)) {
      errors.push({
        field: "cvv",
        message: "Please enter a valid CVV",
      })
    }

    return errors
  }

  const formatCardNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, "")
    const groups = digitsOnly.match(/.{1,4}/g) || []
    return groups.join(" ")
  }

  const formatExpiryDate = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, "")
    if (digitsOnly.length >= 2) {
      return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`
    }
    return digitsOnly
  }

  return {
    validateForm,
    formatCardNumber,
    formatExpiryDate,
  }
}
