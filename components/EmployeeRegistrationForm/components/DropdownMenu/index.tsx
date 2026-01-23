import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"

const DropdownMenu = 
    <T extends FieldValues>
    ({ className, form, name, label, options, schemaKeys }: { className?: string, form: UseFormReturn, name: Path<T>, label: string, options: { label: string, value: string | number }[], schemaKeys: string[] }) => 
{
    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, schemaKeys)

    return (
        <Field className={ className }>
            <FieldLabel htmlFor={ name }>
                { label }
            </FieldLabel>
            <Controller control={ form.control } name={ name } render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={ name }>
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        { options.map((option: { label: string, value: string | number }) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>) }
                    </SelectContent>
                </Select>
            )} />
            <FieldError>
                { firstErrorKey === name && String(form.formState.errors[name]?.message) }
            </FieldError>
        </Field>
    )
}

export default DropdownMenu