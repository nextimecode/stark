import { SupabaseRepository } from "../../../infra/database/supabase/supabase-repository";

export async function GET() {
  const userRepository = new SupabaseRepository<{ id: number; email: string; name: string }>('users');
  const users = await userRepository.select('*', { email: 'nonexistent@example.com' });

  if (users.length === 0) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  return Response.json({
    data: {
      user: users[0]
    }
  });
}
