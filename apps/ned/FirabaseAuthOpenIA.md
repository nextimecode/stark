Abaixo está a solução que aborda o login compartilhado entre dois projetos do Firebase em Next.js 15. Segue uma explicação detalhada e o código necessário.

---

## **Solução**

A solução será dividida em 4 etapas principais:

---

### **1. Autenticação do Usuário**
#### Fluxo:
- O usuário faz login em um dos domínios (ex.: `nextime.com.br`) usando Firebase Authentication.
- Após autenticação bem-sucedida, um token JWT será gerado no lado do cliente usando o método `getIdToken()` do Firebase.

#### Configuração:
- Instale as dependências do Firebase:
  ```bash
  npm install firebase @firebase/auth
  ```

- Configure o Firebase Client-Side:
  ```javascript
  // lib/firebaseClient.ts
  import { initializeApp } from 'firebase/app';
  import { getAuth } from 'firebase/auth';

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  ```

- Gere o token após o login:
  ```javascript
  // pages/api/login.ts
  import { auth } from '@/lib/firebaseClient';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { setCookie } from 'cookies-next';

  export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Armazena o token no cookie (SameSite=None)
      setCookie('authToken', idToken, {
        req,
        res,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 60 * 60 * 24, // 1 dia
      });

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
  ```

---

### **2. Sincronização de Tokens**
- Para sincronizar o token entre os domínios, será utilizada uma **API intermediária**. Essa API verificará e compartilhará tokens entre os dois projetos Firebase.

- Configure a API intermediária:
  ```javascript
  // pages/api/syncToken.ts
  import { verifyIdToken } from '@/lib/firebaseAdmin'; // Admin SDK para verificar tokens
  import { setCookie } from 'cookies-next';

  export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { token } = req.body;

    try {
      // Verifica o token recebido
      const decodedToken = await verifyIdToken(token);

      // Armazena o token no domínio atual
      setCookie('authToken', token, {
        req,
        res,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 60 * 60 * 24, // 1 dia
      });

      res.status(200).json({ message: 'Token synchronized' });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
  ```

- Configure o Firebase Admin SDK para validação do token:
  ```javascript
  // lib/firebaseAdmin.ts
  import admin from 'firebase-admin';

  const serviceAccount = require('/path/to/your-service-account-key.json');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  export const verifyIdToken = async (token) => {
    return admin.auth().verifyIdToken(token);
  };
  ```

---

### **3. Configuração no Next.js**

#### Middleware para Verificação de Autenticação
Utilize o middleware para verificar se o token armazenado no cookie é válido antes de renderizar páginas protegidas.

```javascript
// middleware.ts
import { NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebaseAdmin';

export async function middleware(req) {
  const token = req.cookies.get('authToken');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/protected/:path*'],
};
```

#### Armazenamento no Lado do Cliente
Ao obter o token no login, salve-o no cookie para reutilização em requisições subsequentes:

```javascript
// Após o login no cliente
const login = async (email, password) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};
```

---

### **4. Segurança**

1. **HTTPS obrigatório:** Ambos os domínios devem utilizar HTTPS para proteger os cookies e tokens.
2. **Configuração de cookies:**
   - `SameSite=None`: Permite compartilhamento entre domínios.
   - `Secure: true`: Garante que os cookies só sejam enviados por conexões seguras.
   - `HttpOnly`: Protege contra acesso JavaScript.
3. **Rotação de Tokens:**
   - Configure a expiração do token no Firebase para forçar o re-login após o tempo definido.
4. **Evite reutilização de tokens:**
   - Implemente uma lista de revogação no Firebase Admin SDK para tokens comprometidos.

---

Essa solução permite o compartilhamento seguro de autenticação entre dois domínios diferentes usando Firebase e Next.js 15. Caso precise de refinamentos, posso ajustar conforme necessário!

Sim, você está absolutamente certo! Nunca devemos expor informações sensíveis, como a chave do **Service Account**, diretamente no código. Em vez disso, devemos usar variáveis de ambiente para armazenar essas informações. Aqui está como você pode corrigir essa parte:

---

### **Usando Variáveis de Ambiente para o Service Account**

1. **Configure as variáveis de ambiente:**
   - No arquivo `.env.local` (que é automaticamente carregado no Next.js para o ambiente de desenvolvimento), adicione o conteúdo da sua chave do **Service Account** como uma variável de ambiente JSON. Por exemplo:

     ```env
     FIREBASE_ADMIN_SERVICE_ACCOUNT='{
       "type": "service_account",
       "project_id": "your-project-id",
       "private_key_id": "your-private-key-id",
       "private_key": "-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n",
       "client_email": "your-client-email@your-project.iam.gserviceaccount.com",
       "client_id": "your-client-id",
       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
       "token_uri": "https://oauth2.googleapis.com/token",
       "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
       "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-client-email@your-project.iam.gserviceaccount.com"
     }'
     ```

     **Nota:** Certifique-se de escapar as quebras de linha no campo `private_key` usando `\\n` em vez de apenas `\n`.

2. **Carregue o Service Account do ambiente:**
   - No código, altere a configuração para carregar a variável de ambiente e inicializar o Firebase Admin SDK.

     ```javascript
     // lib/firebaseAdmin.ts
     import admin from 'firebase-admin';

     if (!admin.apps.length) {
       const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT);

       admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
       });
     }

     export const verifyIdToken = async (token) => {
       return admin.auth().verifyIdToken(token);
     };
     ```

3. **Segurança da variável de ambiente:**
   - **Nunca comite o arquivo `.env.local` no controle de versão (como Git).**
   - Adicione o arquivo `.env.local` ao seu `.gitignore`.

     ```gitignore
     # Arquivos de configuração local
     .env.local
     ```

---

### **Benefícios**
- **Maior segurança:** A chave privada nunca será exposta diretamente no código-fonte.
- **Flexibilidade:** É mais fácil configurar diferentes chaves para ambientes (produção, desenvolvimento, etc.).
- **Conformidade:** Evita violações de práticas recomendadas ao manipular dados sensíveis.

