import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { ZodType } from "zod";
import React from "react";

interface FormProps<T extends ZodType<any, any, any>> {
  schema: T;
  defaultValues: any;
  onSubmit: (values: any) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
}

const Form = <T extends ZodType<any, any, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = "",
}: FormProps<T>) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className={className} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
