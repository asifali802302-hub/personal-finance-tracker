import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { transactionAPI } from '../services/api'
import Navbar from '../components/Navbar'
import StatsCards from '../components/StatsCards'
import SpendingCharts from '../components/SpendingCharts'
import TransactionList from '../components/TransactionList'
import TransactionFormModal from '../components/TransactionFormModal'
import { Plus, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categoryExpenses: [],
    monthlyTrends: [],
  })
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [txRes, summaryRes] = await Promise.all([
        transactionAPI.getAll(),
        transactionAPI.getSummary(),
      ])
      setTransactions(txRes.data)
      setSummary(summaryRes.data)
    } catch (err) {
      toast.error('Failed to load transaction data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddTransaction = async (formData) => {
    try {
      const res = await transactionAPI.create(formData)
      toast.success('Transaction added!')
      // Refresh list & stats
      fetchData()
      return res.data
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add transaction')
      throw err
    }
  }

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return
    try {
      await transactionAPI.delete(id)
      toast.success('Transaction removed')
      fetchData()
    } catch (err) {
      toast.error('Could not delete transaction')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Greeting & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || 'Explorer'} 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Here is your financial overview and spending analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition duration-150"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* 1. Summary Stats Cards */}
        <StatsCards
          totalIncome={summary.totalIncome}
          totalExpense={summary.totalExpense}
          balance={summary.balance}
        />

        {/* 2. Visual Charts (Pie & Monthly Trends) */}
        <SpendingCharts
          categoryExpenses={summary.categoryExpenses}
          monthlyTrends={summary.monthlyTrends}
        />

        {/* 3. Transaction History Table with Filters */}
        <TransactionList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          loading={loading}
        />
      </main>

      {/* Modal for adding Income / Expense */}
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransactionAdded={handleAddTransaction}
      />
    </div>
  )
}
