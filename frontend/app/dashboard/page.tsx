"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { TransactionDialog } from "@/components/transaction-dialog"
import { ExpenseByCategoryChart } from "@/components/expense-by-category-chart"
import { ExpenseVsIncomeChart } from "@/components/expense-vs-income-chart"
import { TransactionFlowChart } from "@/components/transaction-flow-chart"

// Transaction type definition
type Transaction = {
  id: string
  date: string
  title: string
  category: string
  amount: number
  type: "expense" | "credit"
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2025-03-10",
      title: "Grocery Shopping",
      category: "Food",
      amount: 85.75,
      type: "expense",
    },
    {
      id: "2",
      date: "2025-03-08",
      title: "Salary Deposit",
      category: "Income",
      amount: 2500,
      type: "credit",
    },
    {
      id: "3",
      date: "2025-03-05",
      title: "Rent Payment",
      category: "Housing",
      amount: 1200,
      type: "expense",
    },
    {
      id: "4",
      date: "2025-03-01",
      title: "Freelance Work",
      category: "Income",
      amount: 750,
      type: "credit",
    },
    {
      id: "5",
      date: "2025-02-28",
      title: "Utilities",
      category: "Utilities",
      amount: 120,
      type: "expense",
    },
    {
      id: "6",
      date: "2025-02-25",
      title: "Restaurant",
      category: "Food",
      amount: 65.5,
      type: "expense",
    },
    {
      id: "7",
      date: "2025-02-20",
      title: "Bonus",
      category: "Income",
      amount: 500,
      type: "credit",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null)

  // Calculate summary data
  const totalIncome = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9),
    }
    setTransactions([...transactions, newTransaction])
    setIsDialogOpen(false)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction)
    setIsDialogOpen(true)
  }

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
    setIsDialogOpen(false)
    setCurrentTransaction(null)
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex h-16 items-center justify-between border-b px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="ml-2 text-xl font-bold">Finance Hub</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Logout</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-blue-50 dark:bg-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpense.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline">All Categories</Button>
              <Button
                onClick={() => {
                  setCurrentTransaction(null)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-2 font-medium">Date</th>
                    <th className="p-2 font-medium">Title</th>
                    <th className="p-2 font-medium">Category</th>
                    <th className="p-2 font-medium">Amount</th>
                    <th className="p-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="p-2">{transaction.date}</td>
                      <td className="p-2">{transaction.title}</td>
                      <td className="p-2">{transaction.category}</td>
                      <td className={`p-2 ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}>
                        {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditTransaction(transaction)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteTransaction(transaction.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseByCategoryChart transactions={transactions} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Expense vs Income</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseVsIncomeChart transactions={transactions} />
            </CardContent>
          </Card>
        </div>

        {/* Transaction Flow Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionFlowChart transactions={transactions} />
          </CardContent>
        </Card>
      </main>

      <TransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        transaction={currentTransaction}
        onAdd={handleAddTransaction}
        onUpdate={handleUpdateTransaction}
      />
    </div>
  )
}

