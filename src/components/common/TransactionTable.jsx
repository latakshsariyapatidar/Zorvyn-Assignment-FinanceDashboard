import { formatCurrency, formatDate } from '../../utils/finance'

const TRANSACTION_COLUMNS = ['Date', 'Description', 'Category', 'Type', 'Amount']

export function TransactionTable({ transactions, role, emptyText, onRowClick }) {
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl">
      <thead className="sticky top-0 z-10">
        <tr>
          {TRANSACTION_COLUMNS.map((column) => (
            <th
              key={column}
              className="border-b border-slate-300/60 bg-slate-50 px-2 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-600 sm:px-3"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.length ? (
          transactions.map((transaction, index) => (
            <tr
              key={transaction.id}
              onClick={() => onRowClick?.(transaction)}
              className={[
                index % 2 === 0 ? 'bg-white/80' : 'bg-slate-100/70',
                role === 'admin' ? 'cursor-pointer transition hover:translate-x-0.5 hover:bg-blue-100/60' : '',
              ].join(' ')}
            >
              <td className="border-b border-slate-300/60 px-2 py-2 text-xs text-slate-700 sm:px-3 sm:text-sm">{formatDate(transaction.date)}</td>
              <td className="border-b border-slate-300/60 px-2 py-2 text-xs text-slate-700 break-words sm:px-3 sm:text-sm">{transaction.description}</td>
              <td className="border-b border-slate-300/60 px-2 py-2 text-xs text-slate-700 break-words sm:px-3 sm:text-sm">{transaction.category}</td>
              <td className="border-b border-slate-300/60 px-2 py-2 text-xs text-slate-700 sm:px-3 sm:text-sm">{transaction.type}</td>
              <td className={`border-b border-slate-300/60 px-2 py-2 text-xs ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'} sm:px-3 sm:text-sm`}>
                {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={TRANSACTION_COLUMNS.length} className="border-b border-slate-300/60 px-3 py-4 text-center text-sm text-slate-600">{emptyText}</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}
