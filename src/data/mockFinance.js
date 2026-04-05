const DEFAULT_TRANSACTIONS = [
  {
    id: 'tx-1001',
    date: '2026-03-31',
    description: 'Salary payout',
    category: 'Salary',
    type: 'income',
    amount: 7800,
  },
  {
    id: 'tx-1002',
    date: '2026-04-01',
    description: 'Apartment rent',
    category: 'Housing',
    type: 'expense',
    amount: 2350,
  },
  {
    id: 'tx-1003',
    date: '2026-04-02',
    description: 'Grocery run',
    category: 'Food',
    type: 'expense',
    amount: 184,
  },
  {
    id: 'tx-1004',
    date: '2026-04-03',
    description: 'Freelance retainer',
    category: 'Freelance',
    type: 'income',
    amount: 1450,
  },
  {
    id: 'tx-1005',
    date: '2026-04-05',
    description: 'Utilities bundle',
    category: 'Utilities',
    type: 'expense',
    amount: 220,
  },
  {
    id: 'tx-1006',
    date: '2026-04-08',
    description: 'Investment dividend',
    category: 'Investments',
    type: 'income',
    amount: 210,
  },
  {
    id: 'tx-1007',
    date: '2026-04-10',
    description: 'Team dinner',
    category: 'Dining',
    type: 'expense',
    amount: 128,
  },
  {
    id: 'tx-1008',
    date: '2026-04-12',
    description: 'Monthly health plan',
    category: 'Health',
    type: 'expense',
    amount: 96,
  },
  {
    id: 'tx-1009',
    date: '2026-03-18',
    description: 'Client payment',
    category: 'Freelance',
    type: 'income',
    amount: 3100,
  },
  {
    id: 'tx-1010',
    date: '2026-03-16',
    description: 'Car insurance',
    category: 'Transport',
    type: 'expense',
    amount: 180,
  },
  {
    id: 'tx-1011',
    date: '2026-02-28',
    description: 'Yearly bonus',
    category: 'Salary',
    type: 'income',
    amount: 2400,
  },
  {
    id: 'tx-1012',
    date: '2026-02-20',
    description: 'Conference travel',
    category: 'Travel',
    type: 'expense',
    amount: 940,
  },
  {
    id: 'tx-1013',
    date: '2026-01-29',
    description: 'Restaurant weekend',
    category: 'Dining',
    type: 'expense',
    amount: 72,
  },
  {
    id: 'tx-1014',
    date: '2026-01-24',
    description: 'Consulting project',
    category: 'Freelance',
    type: 'income',
    amount: 2800,
  },
  {
    id: 'tx-1015',
    date: '2026-01-15',
    description: 'Office supplies',
    category: 'Business',
    type: 'expense',
    amount: 138,
  },
]

export const DEFAULT_APP_STATE = {
  transactions: DEFAULT_TRANSACTIONS,
}

export const APP_STORAGE_KEY = 'finance-dashboard-state-v1'
export const MOCK_API_DELAY = 450

export function createSeedSnapshot() {
  return {
    transactions: DEFAULT_TRANSACTIONS,
    updatedAt: new Date().toISOString(),
  }
}

export function fetchMockFinanceSnapshot() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const raw = window.localStorage.getItem(APP_STORAGE_KEY)
      if (raw) {
        try {
          resolve(JSON.parse(raw))
          return
        } catch {
          window.localStorage.removeItem(APP_STORAGE_KEY)
        }
      }

      resolve(createSeedSnapshot())
    }, MOCK_API_DELAY)
  })
}

export function saveMockFinanceSnapshot(snapshot) {
  const payload = {
    ...snapshot,
    updatedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(payload))

  return Promise.resolve(payload)
}
