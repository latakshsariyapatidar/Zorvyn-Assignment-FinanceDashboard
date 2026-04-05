export function SimpleTable({ headers, rows, emptyText, emptyColSpan }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-separate border-spacing-0 overflow-hidden rounded-xl">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="border-b border-slate-300/60 bg-slate-50 px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-600"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length ? rows : (
          <tr>
            <td colSpan={emptyColSpan} className="border-b border-slate-300/60 px-3 py-4 text-center text-sm text-slate-600">{emptyText}</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}
