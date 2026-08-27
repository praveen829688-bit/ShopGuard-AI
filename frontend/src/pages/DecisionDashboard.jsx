import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ShieldCheck,
  Brain,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Store,
  Star,
  Leaf,
  Lock,
  RotateCcw,
  Target
} from "lucide-react";

export default function DecisionDashboard() {

  const { id = "1" } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`http://127.0.0.1:5000/api/decision-intelligence/${id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [id]);


  if (loading) {

    return (
      <div className="decision-loading">
        <Brain size={45} />
        <h2>ShopGuard AI is thinking...</h2>
        <p>
          Evaluating price, trust, security, reviews and risk.
        </p>
      </div>
    );

  }


  if (!data) {

    return (
      <div className="decision-loading">
        <AlertTriangle size={40} />
        <h2>Unable to load decision.</h2>
        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );

  }


  const product = data.product;
  const a = data.analysis;


  const signalItems = [
    ["Price Intelligence", a.signals.price, TrendingUp],
    ["Product Quality", a.signals.quality, CheckCircle],
    ["Seller Trust", a.signals.seller, Store],
    ["Review Trust", a.signals.reviews, Star],
    ["Compatibility", a.signals.compatibility, Target],
    ["Security", a.signals.security, Lock],
    ["Eco Score", a.signals.eco, Leaf],
    ["Return Safety", a.signals.returns, RotateCcw],
    ["Low Regret", a.signals.regret, Brain]
  ];


  return (

    <div className="decision-page">

      <header className="navbar">

        <Link to="/home" className="brand">

          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>

          ShopGuard <strong>AI</strong>

        </Link>

        <Link to="/products">
          Products
        </Link>

      </header>


      <main className="decision-container">

        <Link
          to={`/product/${product.id}`}
          className="decision-back"
        >
          <ArrowLeft size={18} />
          Back to Product
        </Link>


        <div className="decision-title">

          <div className="ai-badge">
            <Brain size={17} />
            SHOPGUARD DECISION INTELLIGENCE
          </div>

          <h1>
            Should You Buy This Product?
          </h1>

          <p>
            AI combines price, trust, quality, security,
            compatibility, sustainability and risk signals
            before making a recommendation.
          </p>

        </div>


        <section className={`decision-hero ${a.decisionColor.toLowerCase()}`}>

          <div className="decision-main">

            <div className="decision-circle">

              {a.action === "BUY"
                ? <CheckCircle size={42} />
                : a.action === "WAIT"
                ? <AlertTriangle size={42} />
                : <AlertTriangle size={42} />
              }

              <strong>
                {a.score}
              </strong>

              <span>
                /100
              </span>

            </div>


            <div>

              <span className="decision-label">
                FINAL AI DECISION
              </span>

              <h2>
                {a.action}
              </h2>

              <p>
                {product.name}
              </p>

            </div>

          </div>


          <div className="decision-summary">

            <div>
              <span>Price</span>
              <strong>{a.price.status}</strong>
            </div>

            <div>
              <span>Security</span>
              <strong>{a.security.level}</strong>
            </div>

            <div>
              <span>Return Risk</span>
              <strong>{a.returns.status}</strong>
            </div>

            <div>
              <span>Regret</span>
              <strong>{a.regret.level}</strong>
            </div>

          </div>

        </section>


        <section className="signal-section">

          <div className="section-heading">

            <h2>
              AI Signal Breakdown
            </h2>

            <p>
              Every decision is explainable.
            </p>

          </div>


          <div className="signal-grid">

            {signalItems.map(
              ([name, value, Icon]) => (

                <div
                  className="signal-card"
                  key={name}
                >

                  <div className="signal-top">

                    <div className="signal-icon">
                      <Icon size={20} />
                    </div>

                    <strong>
                      {value}
                    </strong>

                  </div>

                  <span>
                    {name}
                  </span>

                  <div className="signal-bar">

                    <div
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, value)
                        )}%`
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        <section className="decision-columns">


          <div className="decision-card">

            <h2>
              <CheckCircle size={21} />
              Why ShopGuard Recommends This
            </h2>

            {a.reasons.map(
              (reason, index) => (

                <div
                  className="reason"
                  key={index}
                >

                  <CheckCircle size={17} />

                  <span>
                    {reason}
                  </span>

                </div>

              )
            )}

          </div>


          <div className="decision-card">

            <h2>
              <AlertTriangle size={21} />
              Risk & Warnings
            </h2>

            {a.warnings.length === 0 ? (

              <div className="safe-message">

                <ShieldCheck size={20} />

                No major warnings detected.

              </div>

            ) : (

              a.warnings.map(
                (warning, index) => (

                  <div
                    className="warning"
                    key={index}
                  >

                    <AlertTriangle size={17} />

                    <span>
                      {warning}
                    </span>

                  </div>

                )
              )

            )}

          </div>


        </section>


        <section className="decision-footer">

          <div>

            <ShieldCheck size={28} />

            <div>

              <strong>
                Explainable AI
              </strong>

              <p>
                ShopGuard does not simply say BUY or AVOID.
                It shows the signals behind the decision.
              </p>

            </div>

          </div>

          <Link
            to={`/product/${product.id}`}
            className="primary-btn"
          >
            View Full Product Analysis
          </Link>

        </section>


      </main>

    </div>
  );
}
