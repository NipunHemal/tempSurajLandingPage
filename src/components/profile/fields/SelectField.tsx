'use client';

import { FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectFieldProps {
    value?: string | number;
    onChange: (value: string) => void;
    options: string[] | number[];
    placeholder?: string;
}

export function SelectField({ value, onChange, options, placeholder }: SelectFieldProps) {
    return (
        <Select onValueChange={onChange} value={value?.toString()}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
