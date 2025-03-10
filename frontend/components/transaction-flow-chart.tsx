"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Transaction = {
  id: string
  date: string
  title: string
  category: string
  amount: number
  type: "expense" | "credit"
}

type TransactionFlowChartProps = {
  transactions: Transaction[]
}

export function TransactionFlowChart({ transactions }: TransactionFlowChartProps) {
  const data = useMemo(() => {
    // Group transactions by date
    const transactionsByDate: Record<string, { expense: number; credit: number }> = {}

    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    sortedTransactions.forEach((t) => {
      if (!transactionsByDate[t.date]) {
        transactionsByDate[t.date] = { expense: 0, credit: 0 }
      }

      if (t.type === "expense") {
        transactionsByDate[t.date].expense += t.amount
      } else {
        transactionsByDate[t.date].credit += t.amount
      }
    })

    return Object.entries(transactionsByDate).map(([date, values]) => ({
      date,
      expense: values.expense,
      credit: values.credit,
    }))
  }, [transactions])

  return (
    <ChartContainer
      config={{
        expense: {
          label: "Expense",
          color: "hsl(var(--chart-1))",
        },
        credit: {
          label: "Income",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="expense" stroke="var(--color-expense)" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="credit" stroke="var(--color-credit)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

