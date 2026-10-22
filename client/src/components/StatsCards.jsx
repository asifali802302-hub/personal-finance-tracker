import React from 'react'
import { TrendingUp, TrendingDown, Scale, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

export default function StatsCards({ totalIncome = 0, totalExpense = 0, balance = 0 }) {
  const isPositive = balance >= 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800/90 border border-slate-700/60 p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Net Balance</span>
          <div className={`p-2 rounded-xl ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            <Scale className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h2 className={`text-3xl font-extrabold tracking-tight ${isPositive ? 'text-white' : 'text-rose-400'}`}>
            {formatCurrency(balance)}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
          {isPositive ? (
            <span className="text-emerald-400 flex items-center gap-0.5 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> Savings positive
            </span>
          ) : (
            <span className="text-rose-400 flex items-center gap-0.5 font-medium">
              <ArrowDownRight className="w-3.5 h-3.5" /> Deficit spending
            </span>
          )}
        </p>
      </div>

      {/* Total Income Card */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Income</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-emerald-400">
          {formatCurrency(totalIncome)}
        </h2>
        <p className="text-xs text-slate-400 mt-2">All incoming cashflow</p>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Expenses</span>
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-rose-400">
          {formatCurrency(totalExpense)}
        </h2>
        <p className="text-xs text-slate-400 mt-2">All outgoing expenditures</p>
      </div>
    </div>
  )
}
