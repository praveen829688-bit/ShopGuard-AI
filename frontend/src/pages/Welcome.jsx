import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Brain,
  LockKeyhole,
  BadgeDollarSign,
  Target,
  Search,
  Leaf
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">

      <nav className="welcome-nav">

        <div className="brand">

          <div className="brand-logo">
            <ShieldCheck size={28} />
          </div>

          <span>
            ShopGuard <strong>AI</strong>
          </span>

        </div>

        <button
          className="outline-btn"
          onClick={() => navigate("/home")}
        >
          Explore Shop
        </button>

      </nav>

      <main className="welcome-content">

        <div className="ai-badge">
          <Sparkles size={16} />
          AI-POWERED INTELLIGENT SHOPPING
        </div>

        <div className="welcome-logo">

          <ShieldCheck size={85} />

          <ShoppingBag
            className="logo-cart"
            size={38}
          />

        </div>

        <h1>
          ShopGuard <span>AI</span>
        </h1>

        <h2>
          Shop Smarter. Decide Better. Stay Protected.
        </h2>

        <p className="welcome-description">
          An explainable AI-powered e-commerce platform that
          evaluates products, prices, sellers, reviews,
          security, compatibility, sustainability and
          personal preferences before you buy.
        </p>

        <div className="welcome-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate("/home")}
          >
            Get Started
            <ArrowRight size={20} />
          </button>

          <button
            className="outline-btn large"
            onClick={() => navigate("/assistant")}
          >
            Ask ShopGuard AI
          </button>

        </div>

        <div className="feature-grid">

          <Feature
            icon={<Brain />}
            title="AI Decisions"
            text="BUY, WAIT or AVOID with clear explanations."
          />

          <Feature
            icon={<LockKeyhole />}
            title="Trust & Security"
            text="Detect seller risks, scams and suspicious reviews."
          />

          <Feature
            icon={<BadgeDollarSign />}
            title="Price Intelligence"
            text="Understand fair price, discounts and value."
          />

          <Feature
            icon={<Target />}
            title="Personalized"
            text="Recommendations based on your goals and preferences."
          />

          <Feature
            icon={<Search />}
            title="Visual Shopping"
            text="Find similar products using images."
          />

          <Feature
            icon={<Leaf />}
            title="Eco Shopping"
            text="Discover sustainable and environmentally friendly choices."
          />

        </div>

      </main>

      <footer>
        SHOP SAFER - SHOP SMARTER - SHOP WITH AI
      </footer>

    </div>
  );
}

function Feature({ icon, title, text }) {

  return (

    <div className="welcome-feature">

      <div className="feature-icon">
        {icon}
      </div>

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {text}
        </p>

      </div>

    </div>

  );
}

