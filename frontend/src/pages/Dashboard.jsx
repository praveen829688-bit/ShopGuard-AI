import { Link } from "react-router-dom";
import { ShieldCheck, ShoppingBag, TrendingDown, Leaf } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="app">

      <header className="navbar">

        <Link to="/home" className="brand">
          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>
          ShopGuard <strong>AI</strong>
        </Link>

        <Link to="/assistant">
          AI Assistant
        </Link>

      </header>

      <main className="section">

        <div className="section-heading">
          <div>
            <h1>Your ShopGuard Dashboard</h1>
            <p>Personal shopping intelligence</p>
          </div>
        </div>

        <div className="stats-grid">

          <Stat icon={<ShoppingBag />} label="Total Spending" value="?42,500" />
          <Stat icon={<TrendingDown />} label="Estimated Savings" value="?6,200" />
          <Stat icon={<ShieldCheck />} label="Average Trust" value="89/100" />
          <Stat icon={<Leaf />} label="Average Eco Score" value="76/100" />

        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <h2>Shopping Intelligence</h2>

            <Row label="AI Recommendations" value="89%" />
            <Row label="Purchase Safety" value="94%" />
            <Row label="Budget Efficiency" value="87%" />
            <Row label="Product Match" value="92%" />

          </div>

          <div className="dashboard-card">

            <h2>Security Status</h2>

            <div className="safe-alert">
              ? No critical shopping security alerts
            </div>

            <p className="muted">
              ShopGuard continuously evaluates shopping
              trust and risk signals.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="intelligence-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
