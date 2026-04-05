export function TransactionFormModal({ open, form, categories, onChange, onCancel, onSave, title }) {
  if (!open) {
    return null
  }

  const fieldClassName = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-200'

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="w-full max-w-[540px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="mb-3 text-lg font-semibold text-slate-900">{title}</h3>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Date</span>
            <input className={fieldClassName} name="date" type="date" value={form.date} onChange={onChange} />
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Amount</span>
            <input className={fieldClassName} name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={onChange} />
          </label>

          <label className="grid gap-1 sm:col-span-2">
            <span className="text-xs font-semibold text-slate-600">Description</span>
            <input className={fieldClassName} name="description" type="text" value={form.description} onChange={onChange} />
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Category</span>
            <select className={fieldClassName} name="category" value={form.category} onChange={onChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Type</span>
            <select className={fieldClassName} name="type" value={form.type} onChange={onChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-xl bg-slate-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:bg-blue-700"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
