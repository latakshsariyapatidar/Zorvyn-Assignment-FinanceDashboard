import { FiltersPanel } from '../components/common/FiltersPanel'
import { TransactionTable } from '../components/common/TransactionTable'

export function TransactionsPage({
  filters,
  categories,
  onFilterChange,
  onResetFilters,
  onAddTransaction,
  transactions,
  role,
  onTransactionClick,
}) {
  return (
    <section className="grid min-w-0 gap-4">
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Transactions</h2>

        <FiltersPanel
          filters={filters}
          categories={categories}
          role={role}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
          onAddTransaction={onAddTransaction}
        />

        <TransactionTable
          transactions={transactions}
          role={role}
          emptyText="No transactions match your current filters."
          onRowClick={onTransactionClick}
        />
      </div>
    </section>
  )
}
