"use client"

import React, { useId } from "react"
import { Input } from "@/components/ui/input"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, ...props }, ref) => {
    const id = useId()

    return (
      <div role="group" aria-labelledby={`${id}-label`} className="space-y-2">
        <label
          id={`${id}-label`}
          htmlFor={id}
          className="block text-sm font-medium"
        >
          {label}
          {required && (
            <span aria-label="required" className="text-red-500 ml-1">
              *
            </span>
          )}
        </label>
        <Input
          ref={ref}
          id={id}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={error ? "border-red-500" : ""}
          {...props}
        />
        {error && (
          <span
            id={`${id}-error`}
            role="alert"
            className="text-sm text-red-500"
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)

FormField.displayName = "FormField"
