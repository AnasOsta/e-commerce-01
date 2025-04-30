"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface buttonProps extends ButtonProps {
  text: string;
}

export function SubmitButton({ text, ...props }: buttonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button {...props} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button {...props} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}
