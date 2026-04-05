const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function formatCompact(value) {
  return compactFormatter.format(value)
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatMonthLabel(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}-01T00:00:00`))
}

export function parseDate(value) {
  return new Date(`${value}T00:00:00`)
}

export function getMonthKey(value) {
  const date = new Date(value)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function getRangeStart(range) {
  const today = new Date('2026-04-15T00:00:00')
  const start = new Date(today)

  if (range === '30d') {
    start.setDate(start.getDate() - 30)
  } else if (range === '90d') {
    start.setDate(start.getDate() - 90)
  } else if (range === '6m') {
    start.setMonth(start.getMonth() - 6)
  } else {
    return null
  }

  return start
}

export function filterTransactions(transactions, filters) {
  const {
    query,
    type,
    category,
    timeRange,
    sortBy,
    sortDirection,
  } = filters
  const rangeStart = getRangeStart(timeRange)
  const normalizedQuery = query.trim().toLowerCase()

  const filtered = transactions.filter((transaction) => {
    const transactionDate = parseDate(transaction.date)
    const matchesRange = !rangeStart || transactionDate >= rangeStart
    const matchesType = type === 'all' || transaction.type === type
    const matchesCategory = category === 'all' || transaction.category === category
    const matchesQuery = !normalizedQuery || [
      transaction.description,
      transaction.category,
      transaction.type,
      String(transaction.amount),
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)

    return matchesRange && matchesType && matchesCategory && matchesQuery
  })

  const direction = sortDirection === 'asc' ? 1 : -1

  return [...filtered].sort((left, right) => {
    if (sortBy === 'amount') {
      return (left.amount - right.amount) * direction
    }

    if (sortBy === 'category') {
      return left.category.localeCompare(right.category) * direction
    }

    return (parseDate(left.date) - parseDate(right.date)) * direction
  })
}

export function computeOverview(transactions) {
  const totals = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === 'income') {
        accumulator.income += transaction.amount
      } else {
        accumulator.expenses += transaction.amount
      }

      return accumulator
    },
    { income: 0, expenses: 0 },
  )

  const balance = totals.income - totals.expenses
  const savingsRate = totals.income > 0 ? (balance / totals.income) * 100 : 0

  return {
    ...totals,
    balance,
    savingsRate,
  }
}

export function getBalanceTrend(transactions) {
  const sorted = [...transactions].sort((left, right) => parseDate(left.date) - parseDate(right.date))
  let runningBalance = 0

  return sorted.map((transaction) => {
    runningBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount

    return {
      label: formatMonthLabel(getMonthKey(transaction.date)),
      date: transaction.date,
      value: runningBalance,
    }
  })
}

export function getMonthlyComparison(transactions) {
  const grouped = new Map()

  transactions.forEach((transaction) => {
    const monthKey = getMonthKey(transaction.date)
    const entry = grouped.get(monthKey) ?? { income: 0, expenses: 0 }

    if (transaction.type === 'income') {
      entry.income += transaction.amount
    } else {
      entry.expenses += transaction.amount
    }

    grouped.set(monthKey, entry)
  })

  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, values]) => ({
      month,
      label: formatMonthLabel(month),
      ...values,
      net: values.income - values.expenses,
    }))
}

export function getSpendingBreakdown(transactions) {
  const expenses = transactions.filter((transaction) => transaction.type === 'expense')
  const totals = expenses.reduce((accumulator, transaction) => {
    accumulator[transaction.category] = (accumulator[transaction.category] ?? 0) + transaction.amount
    return accumulator
  }, {})

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((left, right) => right.amount - left.amount)
}

export function getInsightSummary(transactions) {
  const overview = computeOverview(transactions)
  const breakdown = getSpendingBreakdown(transactions)
  const monthlyComparison = getMonthlyComparison(transactions)
  const topCategory = breakdown[0]
  const topMonth = monthlyComparison.reduce((best, current) => {
    if (!best) {
      return current
    }

    return current.expenses > best.expenses ? current : best
  }, null)

  const latestMonth = monthlyComparison.at(-1)
  const previousMonth = monthlyComparison.at(-2)
  const monthlyDelta = latestMonth && previousMonth ? latestMonth.net - previousMonth.net : 0

  return {
    topCategory,
    topMonth,
    latestMonth,
    monthlyDelta,
    savingsRate: overview.savingsRate,
  }
}

export function groupTransactions(transactions, groupBy) {
  if (!transactions.length) {
    return []
  }

  if (groupBy === 'category') {
    const grouped = new Map()

    transactions.forEach((transaction) => {
      const bucket = grouped.get(transaction.category) ?? []
      bucket.push(transaction)
      grouped.set(transaction.category, bucket)
    })

    return [...grouped.entries()].map(([label, items]) => ({
      label,
      items,
      count: items.length,
      total: items.reduce((sum, item) => sum + item.amount, 0),
    }))
  }

  if (groupBy === 'month') {
    const grouped = new Map()

    transactions.forEach((transaction) => {
      const month = getMonthKey(transaction.date)
      const bucket = grouped.get(month) ?? []
      bucket.push(transaction)
      grouped.set(month, bucket)
    })

    return [...grouped.entries()]
      .sort(([left], [right]) => right.localeCompare(left))
      .map(([label, items]) => ({
        label: formatMonthLabel(label),
        items,
        count: items.length,
        total: items.reduce((sum, item) => sum + item.amount, 0),
      }))
  }

  return [
    {
      label: 'All transactions',
      items: transactions,
      count: transactions.length,
      total: transactions.reduce((sum, transaction) => sum + (transaction.type === 'income' ? transaction.amount : -transaction.amount), 0),
    },
  ]
}

export function createCsv(transactions) {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((transaction) => [
    transaction.date,
    transaction.description,
    transaction.category,
    transaction.type,
    transaction.amount,
  ])

  return [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\n')
}

export function createTransactionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `tx-${Date.now()}`
}
