import { useEffect, useMemo, useState } from 'react'
import { AppNavbar } from './components/layout/AppNavbar'
import { TransactionActionModal } from './components/modals/TransactionActionModal'
import { TransactionFormModal } from './components/modals/TransactionFormModal'
import { EMPTY_FORM, DEFAULT_FILTERS, PAGES, ROLE_STORAGE_KEY } from './constants/app'
import { fetchMockFinanceSnapshot, saveMockFinanceSnapshot } from './data/mockFinance'
import { loadStoredValue } from './helpers/storage'
import {
  createTransactionFromForm,
  isValidTransactionForm,
  normalizeTransactions,
} from './helpers/transactions'
import { usePageNavigation } from './hooks/usePageNavigation'
import { HomePage } from './pages/HomePage'
import { InsightsPage } from './pages/InsightsPage'
import { TransactionsPage } from './pages/TransactionsPage'
import {
  computeOverview,
  createCsv,
  createTransactionId,
  filterTransactions,
  getBalanceTrend,
  getInsightSummary,
  getMonthlyComparison,
  getSpendingBreakdown,
} from './utils/finance'

function App() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncStatus, setSyncStatus] = useState('Synced with mock API')
  const [role, setRole] = useState(() => loadStoredValue(ROLE_STORAGE_KEY, 'viewer'))
  const validPages = useMemo(() => PAGES.map((page) => page.value), [])
  const [page, navigate] = usePageNavigation(validPages)

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [actionPopupOpen, setActionPopupOpen] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    window.localStorage.setItem(ROLE_STORAGE_KEY, role)
  }, [role])

  useEffect(() => {
    let active = true

    async function loadData() {
      setLoading(true)
      const snapshot = await fetchMockFinanceSnapshot()

      if (!active) {
        return
      }

      const nextTransactions = normalizeTransactions(snapshot.transactions ?? [])
      setTransactions(nextTransactions)
      setSyncStatus(`Loaded ${nextTransactions.length} transactions from mock API`)
      setLoading(false)
    }

    loadData()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (loading) {
      return
    }

    saveMockFinanceSnapshot({ transactions })
  }, [transactions, loading])

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((transaction) => transaction.category))

    if (!unique.has('General')) {
      unique.add('General')
    }

    return [...unique].sort((left, right) => left.localeCompare(right))
  }, [transactions])

  const derivedFilters = useMemo(() => {
    const [sortBy, sortDirection] = filters.sortBy.split('-')

    return {
      ...filters,
      sortBy,
      sortDirection,
    }
  }, [filters])

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, derivedFilters),
    [transactions, derivedFilters],
  )

  const overview = useMemo(() => computeOverview(filteredTransactions), [filteredTransactions])
  const trend = useMemo(() => getBalanceTrend(filteredTransactions), [filteredTransactions])
  const monthlyComparison = useMemo(() => getMonthlyComparison(filteredTransactions), [filteredTransactions])
  const breakdown = useMemo(() => getSpendingBreakdown(filteredTransactions), [filteredTransactions])
  const insightSummary = useMemo(() => getInsightSummary(filteredTransactions), [filteredTransactions])

  function handleFilterChange(event) {
    const { name, value } = event.target

    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleResetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  function handleTransactionClick(transaction) {
    if (role !== 'admin') {
      return
    }

    setSelectedTransaction(transaction)
    setActionPopupOpen(true)
  }

  function handleOpenEditModal() {
    if (!selectedTransaction) {
      return
    }

    setEditingId(selectedTransaction.id)
    setForm({
      date: selectedTransaction.date,
      description: selectedTransaction.description,
      category: selectedTransaction.category,
      type: selectedTransaction.type,
      amount: String(selectedTransaction.amount),
    })

    setActionPopupOpen(false)
    setEditModalOpen(true)
  }

  function handleEditFieldChange(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function closeEditModal() {
    setEditModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function closeCreateModal() {
    setCreateModalOpen(false)
    setForm(EMPTY_FORM)
  }

  function handleSaveEdit() {
    if (role !== 'admin' || !editingId) {
      return
    }

    if (!isValidTransactionForm(form)) {
      setSyncStatus('Please fill valid transaction values')
      return
    }

    const nextTransaction = createTransactionFromForm(form, editingId)

    setTransactions((current) =>
      normalizeTransactions(current.map((transaction) => (transaction.id === editingId ? nextTransaction : transaction))),
    )

    setSyncStatus('Transaction updated')
    closeEditModal()
  }

  function handleOpenCreateModal() {
    if (role !== 'admin') {
      return
    }

    setForm({
      ...EMPTY_FORM,
      date: new Date().toISOString().slice(0, 10),
    })
    setCreateModalOpen(true)
  }

  function handleSaveCreate() {
    if (role !== 'admin') {
      return
    }

    if (!isValidTransactionForm(form)) {
      setSyncStatus('Please fill valid transaction values')
      return
    }

    const nextTransaction = createTransactionFromForm(form, createTransactionId())

    setTransactions((current) => normalizeTransactions([nextTransaction, ...current]))
    setSyncStatus('Transaction added')
    closeCreateModal()
  }

  async function handleRefresh() {
    setLoading(true)

    const snapshot = await fetchMockFinanceSnapshot()
    const nextTransactions = normalizeTransactions(snapshot.transactions ?? [])

    setTransactions(nextTransactions)
    setSyncStatus('Refreshed from mock API')
    setLoading(false)
  }

  function handleExport() {
    const csv = createCsv(filteredTransactions)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = url
    anchor.download = `finance-transactions-${new Date().toISOString().slice(0, 10)}.csv`
    anchor.click()

    window.setTimeout(() => URL.revokeObjectURL(url), 0)
    setSyncStatus('CSV exported')
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto my-3 w-full max-w-[1240px] px-2 sm:px-4">
      <AppNavbar
        page={page}
        onNavigate={navigate}
        role={role}
        onRoleChange={setRole}
        loading={loading}
        syncStatus={syncStatus}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <main className="mt-4 grid gap-4">
        {page === 'home' ? (
          <HomePage overview={overview} transactions={filteredTransactions} trend={trend} breakdown={breakdown} />
        ) : null}

        {page === 'transactions' ? (
          <TransactionsPage
            filters={filters}
            categories={categories}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onAddTransaction={handleOpenCreateModal}
            transactions={filteredTransactions}
            role={role}
            onTransactionClick={handleTransactionClick}
          />
        ) : null}

        {page === 'insights' ? (
          <InsightsPage
            breakdown={breakdown}
            monthlyComparison={monthlyComparison}
            insightSummary={insightSummary}
          />
        ) : null}
      </main>

      <TransactionActionModal
        transaction={selectedTransaction}
        open={actionPopupOpen}
        onClose={() => setActionPopupOpen(false)}
        onEdit={handleOpenEditModal}
      />

      <TransactionFormModal
        open={editModalOpen}
        form={form}
        categories={categories}
        onChange={handleEditFieldChange}
        onCancel={closeEditModal}
        onSave={handleSaveEdit}
        title="Edit Transaction"
      />

      <TransactionFormModal
        open={createModalOpen}
        form={form}
        categories={categories}
        onChange={handleEditFieldChange}
        onCancel={closeCreateModal}
        onSave={handleSaveCreate}
        title="Add Transaction"
      />
      </div>
    </div>
  )
}

export default App
