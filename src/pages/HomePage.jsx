import { BalanceTrendChart } from '../components/charts/BalanceTrendChart'
import { SpendingBreakdownChart } from '../components/charts/SpendingBreakdownChart'
import { MetricsCards } from '../components/common/MetricsCards'
import { TransactionTable } from '../components/common/TransactionTable'

export function HomePage({ overview, transactions, trend, breakdown }) {
  const recentTransactions = transactions.slice(0, 6)

  return (
    <section className="grid min-w-0 gap-4">
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Overview</h2>
        <MetricsCards overview={overview} />
      </div>

      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Balance Trend</h2>
        <BalanceTrendChart data={trend} />
      </div>

      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Spending Breakdown</h2>
        <SpendingBreakdownChart data={breakdown} />
      </div>

      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Recent Transactions</h2>
        <TransactionTable
          transactions={recentTransactions}
          emptyText="No transactions available yet."
        />
      </div>
    </section>
  )
}
