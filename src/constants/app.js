export const ROLE_STORAGE_KEY = 'finance-dashboard-role-v1'

export const PAGES = [
  { value: 'home', label: 'Home' },
  { value: 'transactions', label: 'Transactions' },
  { value: 'insights', label: 'Insights' },
]

export const DEFAULT_FILTERS = {
  query: '',
  type: 'all',
  category: 'all',
  timeRange: 'all',
  sortBy: 'date-desc',
}

export const EMPTY_FORM = {
  date: '',
  description: '',
  category: 'General',
  type: 'expense',
  amount: '',
}
