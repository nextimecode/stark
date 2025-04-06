import { ProfileForm } from './profile-form'

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Seu Perfil</h1>
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
