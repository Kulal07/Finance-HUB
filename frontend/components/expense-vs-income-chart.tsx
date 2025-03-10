"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Transaction = {
  id: string
  date: string
  title: string
  category: string
  amount: number
  type: "expense" | "credit"
}

type ExpenseVsIncomeChartProps = {
  transactions: Transaction[]
}

export function ExpenseVsIncomeChart({ transactions }: ExpenseVsIncomeChartProps) {
  const data = useMemo(() => {
    const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const totalIncome = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)

    return [
      { name: "Expense", value: totalExpense },
      { name: "Income", value: totalIncome },
    ]
  }, [transactions])

  const COLORS = ["#FF8042", "#0088FE"]

  return (
    <ChartContainer
      config={{
        value: {
          label: "Amount",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[250px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

