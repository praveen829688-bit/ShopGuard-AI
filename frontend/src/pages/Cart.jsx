import { Link } from "react-router-dom";
import { ShoppingCart, ShieldCheck } from "lucide-react";

export default function Cart() {
  return (
    <div className="app">

      <header className="navbar">

        <Link to="/home" className="brand">
          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>
          ShopGuard <strong>AI</strong>
        </Link>

      </header>

      <main className="empty-page">

        <ShoppingCart size={70} />

        <h1>Your Smart Cart</h1>

        <p>
          Your cart is ready for ShopGuard AI optimization.
        </p>

        <div className="cart-features">
          <span>?? AI Cart Optimization</span>
          <span>?? Best Price Detection</span>
          <span>??? Security Check</span>
          <span>?? Eco Alternatives</span>
        </div>

        <Link to="/products" className="primary-btn">
          Continue Shopping
        </Link>

      </main>

    </div>
  );
}
