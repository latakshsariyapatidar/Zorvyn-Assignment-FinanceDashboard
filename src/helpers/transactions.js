export function normalizeTransactions(transactions) {
  return transactions
    .filter(Boolean)
    .map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      category: transaction.category || 'General',
      description: transaction.description || 'Untitled transaction',
      type: transaction.type === 'income' ? 'income' : 'expense',
    }))
    .filter((transaction) => Number.isFinite(transaction.amount) && transaction.amount >= 0)
}

export function createTransactionFromForm(form, id) {
  return {
    id,
    date: form.date,
    description: form.description.trim(),
    category: form.category.trim() || 'General',
    type: form.type,
    amount: Number(form.amount),
  }
}

export function isValidTransactionForm(form) {
  const parsedAmount = Number(form.amount)
  return Boolean(
    form.date
      && form.description.trim()
      && Number.isFinite(parsedAmount)
      && parsedAmount > 0,
  )
}

export function createMonthlyDeltaText(monthlyDelta, formatCurrency) {
  if (monthlyDelta > 0) {
    return `Net is up by ${formatCurrency(monthlyDelta)} from last month.`
  }

  if (monthlyDelta < 0) {
    return `Net is down by ${formatCurrency(Math.abs(monthlyDelta))} from last month.`
  }

  return 'Net stayed flat compared to last month.'
}
