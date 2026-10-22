import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { PieChart as PieIcon, BarChart3 } from 'lucide-react'
import { formatCurrency } from './StatsCards'

const COLORS = [
  '#10b981', // emerald
  '#f43f5e', // rose
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#3b82f6', // blue
  '#14b8a6', // teal
  '#64748b', // slate
]

export default function SpendingCharts({ categoryExpenses = [], monthlyTrends = [] }) {
  const hasExpenses = categoryExpenses && categoryExpenses.length > 0
  const hasTrends = monthlyTrends && monthlyTrends.length > 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Wise Expense Pie Chart */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Expense by Category</h3>
            <p className="text-xs text-slate-400">Breakdown of outgoing expenses</p>
          </div>
        </div>

        <div className="h-64 w-full flex items-center justify-center">
          {hasExpenses ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryExpenses}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {categoryExpenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc', fontSize: '13px' }}
                />
                <Legend
                  formatter={(value) => <span className="text-xs text-slate-300">{value}</span>}
                  wrapperStyle={{ paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-slate-500 text-sm">
              No expense data recorded yet. Add an expense to see breakdown!
            </div>
          )}
        </div>
      </div>

      {/* Monthly Cash Flow Trends Bar Chart */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Monthly Cash Flow</h3>
            <p className="text-xs text-slate-400">Income vs. Expense over time</p>
          </div>
        </div>

        <div className="h-64 w-full flex items-center justify-center">
          {hasTrends ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                <Tooltip
                  formatter={(val) => formatCurrency(val)}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend
                  formatter={(val) => <span className="text-xs text-slate-300 capitalize">{val}</span>}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-slate-500 text-sm">
              Add transactions across dates to view monthly trends!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
