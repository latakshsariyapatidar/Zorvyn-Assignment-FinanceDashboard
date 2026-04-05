const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
]

const RANGE_OPTIONS = [
  { value: 'all', label: 'All time' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '6m', label: 'Last 6 months' },
]

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest' },
  { value: 'date-asc', label: 'Oldest' },
  { value: 'amount-desc', label: 'Amount high to low' },
  { value: 'amount-asc', label: 'Amount low to high' },
  { value: 'category-asc', label: 'Category A-Z' },
  { value: 'category-desc', label: 'Category Z-A' },
]

export function FiltersPanel({ filters, categories, role, onFilterChange, onResetFilters, onAddTransaction }) {
  const fieldClassName = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-200'

  return (
    <div className="mb-3 grid grid-cols-1 gap-2.5 rounded-xl border border-dashed border-blue-300/60 bg-blue-100/45 p-3 md:grid-cols-2 xl:grid-cols-6">
      <label className="grid gap-1">
        <span className="text-xs font-semibold text-slate-600">Search</span>
        <input
          className={fieldClassName}
          type="search"
          name="query"
          value={filters.query}
          onChange={onFilterChange}
          placeholder="description, category, amount"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-xs font-semibold text-slate-600">Type</span>
        <select className={fieldClassName} name="type" value={filters.type} onChange={onFilterChange}>
          {TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-xs font-semibold text-slate-600">Category</span>
        <select className={fieldClassName} name="category" value={filters.category} onChange={onFilterChange}>
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-xs font-semibold text-slate-600">Range</span>
        <select className={fieldClassName} name="timeRange" value={filters.timeRange} onChange={onFilterChange}>
          {RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-xs font-semibold text-slate-600">Sort</span>
        <select className={fieldClassName} name="sortBy" value={filters.sortBy} onChange={onFilterChange}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col items-stretch justify-end gap-2 sm:flex-row sm:items-end">
        <button
          type="button"
          className="w-full rounded-xl bg-slate-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto"
          onClick={onResetFilters}
        >
          Reset filters
        </button>
        {role === 'admin' ? (
          <button
            type="button"
            className="w-full rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
            onClick={onAddTransaction}
          >
            Add transaction
          </button>
        ) : null}
      </div>
    </div>
  )
}
