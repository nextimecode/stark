import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import { envSchema } from '@/infra/env/env'

export class SupabaseRepository<T> {
  private supabase: SupabaseClient;
  private tableName: string;

  constructor(tableName: string) {
    const env = envSchema.parse(process.env)

    const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase URL and Key must be provided.');
    }

    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    this.tableName = tableName;
  }

  private handleError(error: PostgrestError): never {
    throw new Error(error.message);
  }

  async select(columns: string = '*', filters?: Record<string, any>) {
    let query = this.supabase.from(this.tableName).select(columns);

    if (filters) {
      Object.keys(filters).forEach((key) => {
        query = query.eq(key, filters[key]);
      });
    }

    const { data, error } = await query;
    if (error) this.handleError(error);

    return data;
  }

  async insert(data: T | T[]) {
    const { data: result, error } = await this.supabase.from(this.tableName).insert(data);

    if (error) this.handleError(error);

    return result;
  }

  async update(values: Partial<T>, filters: Record<string, any>) {
    let query = this.supabase.from(this.tableName).update(values);

    Object.keys(filters).forEach((key) => {
      query = query.eq(key, filters[key]);
    });

    const { data, error } = await query;
    if (error) this.handleError(error);

    return data;
  }

  async delete(filters: Record<string, any>) {
    let query = this.supabase.from(this.tableName).delete();

    Object.keys(filters).forEach((key) => {
      query = query.eq(key, filters[key]);
    });

    const { data, error } = await query;
    if (error) this.handleError(error);

    return data;
  }
}
