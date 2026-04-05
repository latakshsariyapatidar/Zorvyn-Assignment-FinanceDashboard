import { formatCurrency, formatDate } from '../../utils/finance'

export function TransactionActionModal({ transaction, open, onClose, onEdit }) {
  if (!open || !transaction) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Transaction</h3>
        <p className="mb-2 text-sm text-slate-700"><strong>{transaction.description}</strong></p>
        <p className="mb-2 text-sm text-slate-600">{formatDate(transaction.date)} | {transaction.category} | {transaction.type}</p>
        <p className="mb-3 text-sm font-semibold text-slate-800">{formatCurrency(transaction.amount)}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-xl bg-slate-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:bg-blue-700"
            onClick={onEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
