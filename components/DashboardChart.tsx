"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function DashboardChart({
  products,
}: {
  products: any[];
}) {
  const barData = products
    .slice(0, 6)
    .map((p) => ({ name: p.name, stock: p.stock }));

  const categoryData: any = {};
  products.forEach((p) => {
    const cat = p.category || "Misc";
    categoryData[cat] = (categoryData[cat] || 0) + 1;
  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* BAR + PIE NEW ARRANGEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="panel-card h-60">
          <header className="mb-2">
            <h4 className="text-sm font-extrabold">
              Inventory Stock Overview
            </h4>
            <p className="text-xs text-[var(--color-muted)]">
              Recently added items
            </p>
          </header>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="stock" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel-card h-60">
          <header className="mb-2">
            <h4 className="text-sm font-extrabold">
              Category Summary
            </h4>
            <p className="text-xs text-[var(--color-muted)]">
              Product count by type
            </p>
          </header>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="45%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={"cat-" + i} />
                ))}
              </Pie>

              <Tooltip />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SALES LINE SECTION – NEW CARD STYLE */}
      <div className="panel-card h-44">
        <header className="mb-2">
          <h4 className="text-sm font-extrabold">
            Weekly Activity
          </h4>
          <p className="text-xs text-[var(--color-muted)]">
            Last seven days
          </p>
        </header>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[
              { day: "Mon", sales: 4 },
              { day: "Tue", sales: 8 },
              { day: "Wed", sales: 6 },
              { day: "Thu", sales: 9 },
              { day: "Fri", sales: 3 },
              { day: "Sat", sales: 7 },
              { day: "Sun", sales: 5 },
            ]}
          >
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis dataKey="day" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Line type="monotone" dataKey="sales" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
