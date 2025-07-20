import { ProfileForm } from './profile-form'

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Seu Perfil</h1>
          <p className="text-muted-foreground">
            Preencha seu perfil para obter análises de compatibilidade mais
            precisas
          </p>
        </div>

        <ProfileForm />
      </div>
    </div>
  )
}
