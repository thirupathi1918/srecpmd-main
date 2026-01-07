import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import DashboardChart from "@/components/DashboardChart";
import AdminHeader from "@/components/AdminHeader";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return products.map((p: any) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toString(),
      updatedAt: p.updatedAt?.toString(),
    }));
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  const totalValue = products.reduce(
    (acc: number, p: any) => acc + p.price * p.stock,
    0
  );

  const activeCategories = [
    ...new Set(products.map((p: any) => p.category)),
  ].length;

  return (
    <section className="page-enter">
      <div className="flex flex-row">
        {/* NEW NAV STYLE */}
        <nav className="hidden lg:flex flex-col w-72 panel-card min-h-screen gap-6">
          <div className="flex items-center justify-center btn-primary bg-blue-100">
            <strong className="text-lg">Dashboard Center</strong>
          </div>

          <ul className="space-y-2 text-[var(--color-muted)]">
            <li className="panel-card hover:shadow-md transition">
              <a href="#overview" className="font-semibold">
                Dashboard
              </a>
            </li>

            <li className="panel-card hover:shadow-md transition">
              <a href="#inventory" className="font-semibold">
                Inventory Items
              </a>
            </li>

            <li className="panel-card hover:shadow-md transition">
              <a href="#sales-chart" className="font-semibold">
                Analytics
              </a>
            </li>

            <li className="panel-card hover:shadow-md transition">
              <a href="#customers" className="font-semibold">
                Customers
              </a>
            </li>
          </ul>
        </nav>

        {/* MAIN AREA */}
        <div className="flex-1 p-4 md:p-6" id="overview">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <header>
              <h1 className="text-3xl font-extrabold">
                Inventory Performance
              </h1>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                Overview of store performance
              </p>
            </header>

            <AdminHeader />
          </div>

          {/* NEW METRIC CARDS */}
          <div
            id="overview"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          >
            <article className="panel-card">
              <p className="text-sm text-[var(--color-muted)]">
                Total Inventory Value
              </p>
              <h2 className="text-2xl font-bold mt-1">
                ${totalValue.toLocaleString()}
              </h2>
            </article>

            <article className="panel-card">
              <p className="text-sm text-[var(--color-muted)]">
                Active Items
              </p>
              <h2 className="text-2xl font-bold mt-1">
                {products.length}
              </h2>
            </article>

            <article className="panel-card">
              <p className="text-sm text-[var(--color-muted)]">
                Categories in Use
              </p>
              <h2 className="text-2xl font-bold mt-1">
                {activeCategories}
              </h2>
            </article>
          </div>

          {/* FORM + CHART WRAPPER */}
          <div id="inventory" className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
            <div className="panel-card">
              <ProductForm />
            </div>

            <div id="sales-chart" className="panel-card">
              <h3 className="text-lg font-extrabold mb-3">
                Analytics Overview
              </h3>
              <DashboardChart products={products} />
            </div>
          </div>

          {/* PRODUCT LIST SECTION */}
          <div className="panel-card">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-extrabold">
                Inventory Items
              </h2>
            </div>

            <ProductList products={products} />
          </div>

          <div
            id="customers"
            className="mt-10 text-center text-[var(--color-muted)]"
          >
            <p>Customer Management Module</p>
          </div>
        </div>
      </div>
    </section>
  );
}
