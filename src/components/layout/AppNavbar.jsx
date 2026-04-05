import { PAGES } from '../../constants/app'

export function AppNavbar({ page, onNavigate, role, onRoleChange, loading, syncStatus, onRefresh, onExport }) {
  return (
    <header className="sticky top-2 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <nav className="flex flex-wrap gap-2" aria-label="Main navigation">
        {PAGES.map((item) => (
          <button
            key={item.value}
            type="button"
            className={[
              'rounded-xl border px-3 py-2 text-sm font-semibold transition',
              'border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5 hover:border-blue-300',
              page === item.value ? 'border-blue-400 bg-blue-100 text-blue-900' : '',
            ].join(' ')}
            onClick={() => onNavigate(item.value)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto">
        <label className="flex items-center gap-2 rounded-xl bg-white px-2 py-1.5">
          <span className="text-sm font-semibold text-slate-600">Role</span>
          <select
            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-200"
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button
          type="button"
          className="rounded-xl bg-slate-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          onClick={onRefresh}
        >
          Refresh mock API
        </button>
        <button
          type="button"
          className="rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:bg-blue-700"
          onClick={onExport}
        >
          Export CSV
        </button>

        <div className="min-w-0 px-1 py-1 lg:max-w-[220px]">
          <span className="block text-sm font-bold text-emerald-800">{loading ? 'Loading...' : 'Ready'}</span>
          <small className="block truncate text-xs text-slate-600">{syncStatus}</small>
        </div>
      </div>
    </header>
  )
}
