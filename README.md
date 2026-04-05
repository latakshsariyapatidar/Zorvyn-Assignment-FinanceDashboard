# Finance Dashboard

A clean and interactive finance dashboard built with React + Vite. The app is designed for frontend evaluation scenarios and demonstrates reusable component design, structured state handling, role-based UI behavior, and responsive data visualization.

## Live Scope

This project is frontend-only and uses mock data with local persistence.

- No backend is required.
- No authentication is implemented.
- Role behavior is simulated in the UI (`viewer` and `admin`).

## Core Features

### 1) Dashboard Overview

- Summary cards: Balance, Income, Expenses, Savings Rate.
- Time-based visualization: SVG Balance Trend chart.
- Categorical visualization: Spending Breakdown bars by category.
- Recent transactions table for quick scanning.

### 2) Transactions Section

- Detailed table with Date, Description, Category, Type, and Amount.
- Search and filtering by:
   - text query
   - transaction type
   - category
   - time range
- Sorting by date, amount, and category.
- Empty state handling when no rows match filters.

### 3) Basic Role-Based UI (Frontend Simulation)

- `viewer`:
   - Can view all dashboards and data.
   - Cannot add/edit transactions.
- `admin`:
   - Can add transactions.
   - Can click transaction rows to edit existing entries.

### 4) Insights Section

- Highlight cards:
   - Highest spending category
   - Most expensive month
   - Savings-rate and monthly net observation
- Supporting data tables:
   - Spending by category
   - Month-by-month income/expense/net comparison

### 5) State Management

State is managed using React hooks:

- `useState` for source state (`transactions`, `filters`, `role`, modals, forms).
- `useMemo` for derived state (overview, charts, insights, filtered rows).
- `useEffect` for persistence and mock API loading.

### 6) UX & Reliability

- Responsive layout for desktop/tablet/mobile.
- Dedicated empty states for charts and tables.
- CSV export of currently filtered transactions.
- Loading and sync-status feedback in the top bar.
- Data and role persistence via `localStorage`.

## Architecture

The app has been refactored into reusable modules and clear folders.

```text
src/
   App.jsx
   index.css
   main.jsx
   assets/
   components/
      charts/
         BalanceTrendChart.jsx
         SpendingBreakdownChart.jsx
      common/
         FiltersPanel.jsx
         InsightHighlights.jsx
         MetricsCards.jsx
         SimpleTable.jsx
         TransactionTable.jsx
      layout/
         AppNavbar.jsx
      modals/
         TransactionActionModal.jsx
         TransactionFormModal.jsx
   constants/
      app.js
   data/
      mockFinance.js
   helpers/
      storage.js
      transactions.js
   hooks/
      usePageNavigation.js
   pages/
      HomePage.jsx
      InsightsPage.jsx
      TransactionsPage.jsx
   utils/
      finance.js
```

### Folder Responsibilities

- `components/charts`: data visual components.
- `components/common`: reusable UI blocks (tables, filters, cards).
- `components/layout`: shell-level layout pieces.
- `components/modals`: reusable dialog components.
- `pages`: page-level composition for each route/section.
- `hooks`: shared custom hooks.
- `helpers`: app-specific data/form utilities.
- `constants`: static config and default state values.
- `utils`: pure finance/domain calculations and formatters.

## Data Flow

1. Load snapshot from mock API (`fetchMockFinanceSnapshot`).
2. Normalize transaction data for safe rendering.
3. Persist updates using `saveMockFinanceSnapshot`.
4. Derive filtered transactions and analytics from source state.
5. Render pages using reusable presentational components.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Run Locally

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start development server:

    ```bash
    npm run dev
    ```

3. Open the URL shown by Vite (typically `http://localhost:5173`).

## Assignment Requirement Mapping

### Dashboard Overview

- Summary cards: implemented.
- Time-based chart: implemented.
- Categorical chart: implemented.

### Transactions Section

- Transaction table fields: implemented.
- Filtering + sorting + search: implemented.

### Role-Based UI

- Viewer/admin simulation via dropdown: implemented.
- Admin add/edit actions: implemented.

### Insights

- Highest spending category: implemented.
- Monthly comparison: implemented.
- Observation text: implemented.

### State Management

- Centralized and memoized state with React hooks: implemented.

### UI/UX Expectations

- Responsive behavior: implemented.
- Empty states: implemented.

## Assumptions

- Financial amounts are positive numbers; transaction type controls sign semantics.
- Date ranges are computed against a fixed reference date in utility logic for stable demo behavior.
- Mock API delay is intentional to demonstrate loading state.

## Edge Cases Covered

- Empty dataset at load time.
- No filter matches.
- Missing/invalid form values during add/edit.
- Viewer attempting admin actions.
- CSV export when filtered list is empty.



