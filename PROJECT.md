# stark

```sql
-- Tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de testes
CREATE TABLE tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users (id),
    test_date TIMESTAMP DEFAULT NOW(),
    personality_traits JSONB NOT NULL, -- Resultados do teste em formato JSON
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de perguntas
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    category TEXT NOT NULL, -- Categoria da pergunta (ex.: personalidade, interesses)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de respostas
CREATE TABLE answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID NOT NULL REFERENCES tests (id),
    question_id INT NOT NULL REFERENCES questions (id),
    answer_value TEXT NOT NULL, -- Resposta do usuário
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de resultados de compatibilidade
CREATE TABLE compatibility_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_1_id UUID NOT NULL REFERENCES users (id),
    user_2_id UUID NOT NULL REFERENCES users (id),
    compatibility_score DECIMAL(5, 2) NOT NULL, -- Score de compatibilidade
    details JSONB NOT NULL, -- Informações detalhadas sobre a compatibilidade
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```
