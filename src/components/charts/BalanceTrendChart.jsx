import { formatCurrency, formatDate } from '../../utils/finance'

export function BalanceTrendChart({ data }) {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-600">
        <p>No transactions yet to draw a balance graph.</p>
      </div>
    )
  }

  const width = 900
  const height = 280
  const padding = 28
  const values = data.map((point) => point.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = Math.max(maxValue - minValue, 1)

  const points = data.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1)
    const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2)

    return {
      ...point,
      x,
      y,
    }
  })

  const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(' ')
  const areaPath = `M ${points[0].x} ${height - padding} ${points
    .map((point) => `L ${point.x} ${point.y}`)
    .join(' ')} L ${points[points.length - 1].x} ${height - padding} Z`

  return (
    <div className="grid gap-2.5">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block w-full rounded-xl border border-slate-300/70 bg-blue-100/60"
        role="img"
        aria-label="Balance trend graph"
      >
        {[0, 1, 2, 3].map((step) => (
          <line
            key={step}
            x1={padding}
            x2={width - padding}
            y1={padding + step * ((height - padding * 2) / 3)}
            y2={padding + step * ((height - padding * 2) / 3)}
            stroke="rgba(71, 85, 105, 0.22)"
            strokeDasharray="4 8"
          />
        ))}

        <path d={areaPath} fill="rgba(37, 99, 235, 0.18)" />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {points.map((point) => (
          <g key={point.date}>
            <circle cx={point.x} cy={point.y} r="4" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" />
            <title>{`${formatDate(point.date)}: ${formatCurrency(point.value)}`}</title>
          </g>
        ))}
      </svg>

      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-600">
        <span>Lowest: {formatCurrency(minValue)}</span>
        <span>Highest: {formatCurrency(maxValue)}</span>
      </div>
    </div>
  )
}
