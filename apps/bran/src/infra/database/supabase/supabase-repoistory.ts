import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import { Env } from '../../env/env';

export class SupabaseRepository<T> {
  private supabase: SupabaseClient;
  private tableName: string;

  constructor(env: Env, tableName: string) {
    const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = env;

    if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Supabase URL and Key must be provided.');
    }

    this.supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);
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
