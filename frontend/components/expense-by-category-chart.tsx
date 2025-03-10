"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Transaction = {
  id: string
  date: string
  title: string
  category: string
  amount: number
  type: "expense" | "credit"
}

type ExpenseByCategoryChartProps = {
  transactions: Transaction[]
}

export function ExpenseByCategoryChart({ transactions }: ExpenseByCategoryChartProps) {
  const data = useMemo(() => {
    const expensesByCategory: Record<string, number> = {}

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (expensesByCategory[t.category]) {
          expensesByCategory[t.category] += t.amount
        } else {
          expensesByCategory[t.category] = t.amount
        }
      })

    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount,
    }))
  }, [transactions])

  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[250px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="amount" fill="var(--color-amount)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

