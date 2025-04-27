"use client";

import { useFormStatus } from "react-dom";

export function AddMBTIButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "carregando" : "Salvar MBTI"}
    </button>
  );
}
