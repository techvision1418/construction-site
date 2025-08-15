"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type User, type AuthState, mockUsers } from "@/lib/auth"

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User | null) => void
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock authentication - in real app, this would be an API call
        const user = mockUsers.find((u) => u.email === email)

        if (user && password === "password123") {
          const updatedUser = { ...user, lastLogin: new Date() }
          set({
            user: updatedUser,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }

        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
