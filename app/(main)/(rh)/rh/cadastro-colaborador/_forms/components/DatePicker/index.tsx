"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ZodObject } from "zod"

const DatePicker = <T extends FieldValues>(
    { form, formSchema, fieldName, canBeFuture, label, className }:
    { form: UseFormReturn, formSchema: ZodObject, fieldName: Path<T>, canBeFuture?: boolean, label: string, className?: string }
) => {
    const [open, setOpen] = useState(false)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

    return (
        <Controller
            control={ form.control }
            name={ fieldName }
            defaultValue={undefined}
            render={({ field }) => {
                const date = field.value instanceof Date ? field.value : field.value ? new Date(field.value) : undefined
                const isValidDate = date instanceof Date && !isNaN(date.getTime()) && (!canBeFuture || date <= new Date())

                return (
                    <Field className={ className }>
                        <FieldLabel htmlFor={ fieldName }>
                            { label }
                        </FieldLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button id="date" variant="outline" className="justify-between font-normal">
                                    {isValidDate ? date.toLocaleDateString("pt-BR") : "Selecione uma data"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start">
                                <Calendar
                                    mode="single"
                                    selected={isValidDate ? date : undefined}
                                    captionLayout="dropdown"
                                    onSelect={(selectedDate) => {
                                        field.onChange(selectedDate)
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <FieldError>
                            {firstErrorKey === fieldName && String(form.formState.errors[fieldName]?.message)}
                        </FieldError>
                    </Field>
                )
            }}
        />
    )
}

export default DatePicker