import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Wallet, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg text-white leading-tight">FinanceTracker</h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">Personal Spending & Budget Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full">
            <User className="w-4 h-4 text-emerald-400" />
            <span className="font-medium max-w-[120px] truncate">{user?.name || user?.email || 'User'}</span>
          </div>

          <button
            onClick={logout}
            title="Logout"
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 rounded-xl transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
