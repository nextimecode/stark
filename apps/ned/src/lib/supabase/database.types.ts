export interface Database {
  public: {
    Tables: {
      answers: {
        Insert: {
          created_at?: string
          id?: number
          question_id: number
          text: string
          value: number
        }
        Row: {
          created_at: string
          id: number
          question_id: number
          text: string
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          question_id?: number
          text?: string
          value?: number
        }
      }
      categories: {
        Insert: {
          created_at?: string
          description?: null | string
          id?: number
          name: string
        }
        Row: {
          created_at: string
          description: null | string
          id: number
          name: string
        }
        Update: {
          created_at?: string
          description?: null | string
          id?: number
          name?: string
        }
      }
      comparisons: {
        Insert: {
          compatibility_score: number
          created_at?: string
          details: Json
          id?: string
          test_id_1: string
          test_id_2: string
        }
        Row: {
          compatibility_score: number
          created_at: string
          details: Json
          id: string
          test_id_1: string
          test_id_2: string
        }
        Update: {
          compatibility_score?: number
          created_at?: string
          details?: Json
          id?: string
          test_id_1?: string
          test_id_2?: string
        }
      }
      invitations: {
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          relationship_type_id: number
          sender_id: string
          status?: string
          test_id?: null | string
        }
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          relationship_type_id: number
          sender_id: string
          status: string
          test_id: null | string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          relationship_type_id?: number
          sender_id?: string
          status?: string
          test_id?: null | string
        }
      }
      question_relationship_type: {
        Insert: {
          question_id: number
          relationship_type_id: number
          weight?: number
        }
        Row: {
          question_id: number
          relationship_type_id: number
          weight: number
        }
        Update: {
          question_id?: number
          relationship_type_id?: number
          weight?: number
        }
      }
      questions: {
        Insert: {
          category_id: number
          created_at?: string
          id?: number
          text: string
          weight?: number
        }
        Row: {
          category_id: number
          created_at: string
          id: number
          text: string
          weight: number
        }
        Update: {
          category_id?: number
          created_at?: string
          id?: number
          text?: string
          weight?: number
        }
      }
      relationship_types: {
        Insert: {
          created_at?: string
          description?: null | string
          id?: number
          name: string
        }
        Row: {
          created_at: string
          description: null | string
          id: number
          name: string
        }
        Update: {
          created_at?: string
          description?: null | string
          id?: number
          name?: string
        }
      }
      tests: {
        Insert: {
          created_at?: string
          id?: string
          relationship_type_id: number
          results: Json
          updated_at?: string
          user_id: string
        }
        Row: {
          created_at: string
          id: string
          relationship_type_id: number
          results: Json
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          relationship_type_id?: number
          results?: Json
          updated_at?: string
          user_id?: string
        }
      }
      users: {
        Insert: {
          avatar_url?: null | string
          created_at?: string
          email: string
          full_name?: null | string
          id: string
          updated_at?: string
        }
        Row: {
          avatar_url: null | string
          created_at: string
          email: string
          full_name: null | string
          id: string
          updated_at: string
        }
        Update: {
          avatar_url?: null | string
          created_at?: string
          email?: string
          full_name?: null | string
          id?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Json =
  | boolean
  | Json[]
  | null
  | number
  | string
  | { [key: string]: Json | undefined }
