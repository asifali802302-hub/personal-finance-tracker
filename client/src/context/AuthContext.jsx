import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pft_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('pft_token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If token exists, verify validity
    if (token) {
      authAPI.me()
        .then((res) => {
          setUser(res.data)
          localStorage.setItem('pft_user', JSON.stringify(res.data))
        })
        .catch(() => {
          logout()
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password })
      const { token: jwtToken, id, name, email: userEmail } = res.data
      const userData = { id, name, email: userEmail }

      localStorage.setItem('pft_token', jwtToken)
      localStorage.setItem('pft_user', JSON.stringify(userData))

      setToken(jwtToken)
      setUser(userData)
      toast.success(`Welcome back, ${name || 'User'}!`)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Login failed. Please check credentials.'
      toast.error(msg)
      return { success: false, error: msg }
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await authAPI.register({ name, email, password })
      const { token: jwtToken, id, name: userName, email: userEmail } = res.data
      const userData = { id, name: userName, email: userEmail }

      localStorage.setItem('pft_token', jwtToken)
      localStorage.setItem('pft_user', JSON.stringify(userData))

      setToken(jwtToken)
      setUser(userData)
      toast.success('Account created successfully!')
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Try another email.'
      toast.error(msg)
      return { success: false, error: msg }
    }
  }

  const logout = () => {
    localStorage.removeItem('pft_token')
    localStorage.removeItem('pft_user')
    setToken(null)
    setUser(null)
    toast.success('Logged out safely')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
