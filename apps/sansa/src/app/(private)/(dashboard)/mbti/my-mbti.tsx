export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

import { api } from "@/data/api";

interface Question {
  id: string;
  slug: string;
}

const fetchQuestions = async () => {
  // Autenticação
  const authResponse = await api("/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "diego@rocketseat.com.br",
      password: "123456",
    }),
  });

  if (!authResponse.ok) {
    throw new Error("Falha na autenticação");
  }

  const authData = await authResponse.json();
  const accessToken = authData.access_token;

  // Buscar perguntas
  const response = await api("/questions?page=1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar perguntas");
  }

  const questionsData = await response.json();
  return questionsData.questions;
};

export const MyMBTI = async () => {
  let questions: Question[] = [];

  try {
    questions = await fetchQuestions();
  } catch (error) {
    notFound();
  }

  if (!questions || questions.length === 0) {
    return <p>Nenhuma pergunta encontrada.</p>;
  }

  return (
    <ul>
      {questions.map((item) => (
        <li key={item.id}>{item.slug}</li>
      ))}
    </ul>
  );
};
