export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      relationship_types: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      questions: {
        Row: {
          id: number
          category_id: number
          text: string
          weight: number
          created_at: string
        }
        Insert: {
          id?: number
          category_id: number
          text: string
          weight?: number
          created_at?: string
        }
        Update: {
          id?: number
          category_id?: number
          text?: string
          weight?: number
          created_at?: string
        }
      }
      question_relationship_type: {
        Row: {
          question_id: number
          relationship_type_id: number
          weight: number
        }
        Insert: {
          question_id: number
          relationship_type_id: number
          weight?: number
        }
        Update: {
          question_id?: number
          relationship_type_id?: number
          weight?: number
        }
      }
      answers: {
        Row: {
          id: number
          question_id: number
          text: string
          value: number
          created_at: string
        }
        Insert: {
          id?: number
          question_id: number
          text: string
          value: number
          created_at?: string
        }
        Update: {
          id?: number
          question_id?: number
          text?: string
          value?: number
          created_at?: string
        }
      }
      tests: {
        Row: {
          id: string
          user_id: string
          relationship_type_id: number
          results: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          relationship_type_id: number
          results: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          relationship_type_id?: number
          results?: Json
          created_at?: string
          updated_at?: string
        }
      }
      comparisons: {
        Row: {
          id: string
          test_id_1: string
          test_id_2: string
          compatibility_score: number
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          test_id_1: string
          test_id_2: string
          compatibility_score: number
          details: Json
          created_at?: string
        }
        Update: {
          id?: string
          test_id_1?: string
          test_id_2?: string
          compatibility_score?: number
          details?: Json
          created_at?: string
        }
      }
      invitations: {
        Row: {
          id: string
          sender_id: string
          email: string
          relationship_type_id: number
          status: string
          test_id: string | null
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          email: string
          relationship_type_id: number
          status?: string
          test_id?: string | null
          created_at?: string
          expires_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          email?: string
          relationship_type_id?: number
          status?: string
          test_id?: string | null
          created_at?: string
          expires_at?: string
        }
      }
    }
  }
}
