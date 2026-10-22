export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      agent_logs: {
        Row: {
          arguments: Json
          created_at: string | null
          id: string
          result: Json
          session_id: string
          tool_name: string
          user_id: string | null
          user_message: string
        }
        Insert: {
          arguments: Json
          created_at?: string | null
          id?: string
          result: Json
          session_id: string
          tool_name: string
          user_id?: string | null
          user_message: string
        }
        Update: {
          arguments?: Json
          created_at?: string | null
          id?: string
          result?: Json
          session_id?: string
          tool_name?: string
          user_id?: string | null
          user_message?: string
        }
        Relationships: []
      }
      agent_usage: {
        Row: {
          count: number
          subject: string
          window_start: string
        }
        Insert: {
          count?: number
          subject: string
          window_start?: string
        }
        Update: {
          count?: number
          subject?: string
          window_start?: string
        }
        Relationships: []
      }
      ai_service_state: {
        Row: {
          id: string
          paused: boolean
          reason: string
          status: number
        }
        Insert: {
          id: string
          paused?: boolean
          reason?: string
          status?: number
        }
        Update: {
          id?: string
          paused?: boolean
          reason?: string
          status?: number
        }
        Relationships: []
      }
      bookings: {
        Row: {
          approved: boolean
          created_at: string
          customer_id: string
          day: string
          id: string
          note: string
          status: string
          time: string
          worker_id: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          customer_id: string
          day: string
          id?: string
          note?: string
          status?: string
          time: string
          worker_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          customer_id?: string
          day?: string
          id?: string
          note?: string
          status?: string
          time?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          message: Json
          sdk_id: string
          thread_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: Json
          sdk_id: string
          thread_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: Json
          sdk_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string
          full_name: string
          id: string
          phone: string
        }
        Insert: {
          city?: string
          full_name?: string
          id: string
          phone?: string
        }
        Update: {
          city?: string
          full_name?: string
          id?: string
          phone?: string
        }
        Relationships: []
      }
      threads: {
        Row: {
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "threads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      worker_documents: {
        Row: {
          created_at: string | null
          path: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          path: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workers: {
        Row: {
          area: string
          available: string[]
          bio: string
          category_id: string
          city: string
          created_at: string
          id: string
          is_sample: boolean
          languages: string[]
          name: string
          portfolio: string[]
          radius: number
          rate: number
          rating: number
          reviews: number
          skills: string[]
          time_slots: string[]
          unit: string
          user_id: string | null
          verification_status: string
          verified: boolean
          worker_type: string
          years: number
        }
        Insert: {
          area?: string
          available?: string[]
          bio?: string
          category_id: string
          city: string
          created_at?: string
          id?: string
          is_sample?: boolean
          languages?: string[]
          name: string
          portfolio?: string[]
          radius?: number
          rate: number
          rating?: number
          reviews?: number
          skills?: string[]
          time_slots?: string[]
          unit?: string
          user_id?: string | null
          verification_status?: string
          verified?: boolean
          worker_type?: string
          years?: number
        }
        Update: {
          area?: string
          available?: string[]
          bio?: string
          category_id?: string
          city?: string
          created_at?: string
          id?: string
          is_sample?: boolean
          languages?: string[]
          name?: string
          portfolio?: string[]
          radius?: number
          rate?: number
          rating?: number
          reviews?: number
          skills?: string[]
          time_slots?: string[]
          unit?: string
          user_id?: string | null
          verification_status?: string
          verified?: boolean
          worker_type?: string
          years?: number
        }
        Relationships: [
          {
            foreignKeyName: "workers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      choose_account_role: {
        Args: { chosen: Database["public"]["Enums"]["app_role"] }
        Returns: undefined
      }
      consume_agent_message: { Args: { subject_key: string }; Returns: boolean }
      free_worker_slots: {
        Args: { chosen_day: string; worker: string }
        Returns: string[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "worker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "worker"],
    },
  },
} as const
