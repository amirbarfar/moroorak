import { api } from '@/lib/api';
import { useState } from 'react';
import { z } from 'zod';

interface UseFormSubmitProps<T> {
    schema: z.ZodSchema<T>;
    endpoint: string;
    method?: 'POST' | 'PUT' | 'PATCH';
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
}

export function useFormSubmit<T>({
    schema,
    endpoint,
    method = 'POST',
    onSuccess,
    onError,
}: UseFormSubmitProps<T>) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const submit = async (data: T) => {
        setIsLoading(true);
        setErrors({});
        setServerError(null);

        const validation = schema.safeParse(data);
        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            validation.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0].toString()] = err.message;
                }
            });
            setErrors(fieldErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await api(endpoint, {
                method,
                body: JSON.stringify(validation.data)
            })

            onSuccess?.(response);
            return response;
        } catch (error: any) {
            const errorMessage = error.message || 'خطای ناشناخته';
            setServerError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        submit,
        isLoading,
        errors,
        serverError,
        setErrors,
    };
}