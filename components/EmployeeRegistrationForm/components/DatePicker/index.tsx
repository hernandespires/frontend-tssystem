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

const DatePicker = <T extends FieldValues>({ form, formSchema, fieldName, label, className }: { form: UseFormReturn, formSchema: ZodObject, fieldName: Path<T>, label: string, className?: string}) => {
    const [open, setOpen] = useState(false)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

    return (
        <Controller control={ form.control } name={ fieldName } defaultValue={undefined} render={({ field }) => {
            // const isToday = new Date(field.value).toDateString() === new Date().toDateString()
            
            return (
                <Field className={ className }>                
                    <FieldLabel htmlFor={ fieldName }>
                        { label }
                    </FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button id="date" variant="outline" className="justify-between font-normal">                            
                                {field.value ? field.value.toLocaleDateString("pt-BR") : "Selecione uma data"}
                                {/* {!field.value || isToday ? "Select date" : new Date(field.value).toLocaleDateString("pt-BR")} */}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start">
                            <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} captionLayout="dropdown" onSelect={(date) => {
                                field.onChange(date)
                                setOpen(false)
                            }} />
                        </PopoverContent>
                    </Popover>
                    <FieldError>
                        { firstErrorKey === fieldName && String(form.formState.errors[fieldName]?.message) }
                    </FieldError>
                </Field>
            )
        }} />
    )
}

export default DatePicker