import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ShieldCheck,
  ShieldAlert,
  Star,
  Store,
  Lock,
  AlertTriangle,
  CheckCircle,
  Ban,
  ArrowLeft,
  Bot,
  ShoppingCart,
  Search
} from "lucide-react";

export default function SecurityCenter() {

  const { id = "1" } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:5000/api/security-intelligence/${id}`
      )
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
      <div className="security-loading">
        <ShieldCheck size={50} />
        <h2>ShopGuard is checking product security...</h2>
        <p>
          Analyzing seller, price, reviews, claims and
          autonomous shopping risks.
        </p>
      </div>
    );

  }


  if (!data) {

    return (
      <div className="security-loading">
        <AlertTriangle size={45} />
        <h2>Security analysis unavailable.</h2>
        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );

  }


  const product = data.product;
  const a = data.analysis;

  const overallClass =
    a.overall.level === "SAFE"
      ? "safe"
      : a.overall.level === "MODERATE"
      ? "moderate"
      : "danger";


  return (

    <div className="security-page">

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


      <main className="security-container">

        <Link
          to={`/product/${product.id}`}
          className="security-back"
        >
          <ArrowLeft size={18} />
          Back to Product
        </Link>


        <div className="security-heading">

          <div className="security-badge">
            <ShieldCheck size={17} />
            SHOPGUARD SECURITY INTELLIGENCE
          </div>

          <h1>
            Can You Trust This Purchase?
          </h1>

          <p>
            ShopGuard combines ScamGuard AI, Fake Review AI
            and Agent Security to protect your purchase.
          </p>

        </div>


        <section className={`security-hero ${overallClass}`}>

          <div className="security-score">

            <ShieldCheck size={38} />

            <strong>
              {a.overall.score}
            </strong>

            <span>
              /100
            </span>

          </div>


          <div>

            <span className="security-label">
              OVERALL SECURITY
            </span>

            <h2>
              {a.overall.level}
            </h2>

            <p>
              {product.name}
            </p>

          </div>

        </section>


        <section className="security-grid">


          <div className="security-card">

            <div className="security-card-title">

              <div className="security-card-icon">
                <ShieldAlert size={22} />
              </div>

              <div>
                <h2>ScamGuard AI</h2>
                <p>Pre-purchase scam detection</p>
              </div>

            </div>


            <div className="big-score">
              {a.scamGuard.score}
              <span>/100 risk</span>
            </div>


            <div className={`risk-pill ${a.scamGuard.level.toLowerCase()}`}>
              {a.scamGuard.level} RISK
            </div>


            <div className="security-metrics">

              <div>
                <span>Seller Risk</span>
                <strong>
                  {a.scamGuard.sellerRisk}%
                </strong>
              </div>

              <div>
                <span>Price Manipulation</span>
                <strong>
                  {a.scamGuard.priceManipulationRisk}%
                </strong>
              </div>

              <div>
                <span>Claim Risk</span>
                <strong>
                  {a.scamGuard.claimRisk}%
                </strong>
              </div>

              <div>
                <span>Return Risk</span>
                <strong>
                  {a.scamGuard.returnRisk}%
                </strong>
              </div>

            </div>


            <h3>AI Detection</h3>

            {a.scamGuard.signals.map(
              (signal, index) => (

                <div
                  className="security-reason"
                  key={index}
                >
                  <CheckCircle size={16} />
                  {signal}
                </div>

              )
            )}

          </div>


          <div className="security-card">

            <div className="security-card-title">

              <div className="security-card-icon">
                <Star size={22} />
              </div>

              <div>
                <h2>Fake Review AI</h2>
                <p>Review authenticity analysis</p>
              </div>

            </div>


            <div className="big-score">
              {a.fakeReviewAI.authenticityScore}
              <span>/100 trust</span>
            </div>


            <div className="risk-pill trusted">
              {a.fakeReviewAI.status}
            </div>


            <div className="review-highlight">

              <div>
                <strong>
                  {a.fakeReviewAI.estimatedSuspiciousPercent}%
                </strong>
                <span>Estimated suspicious</span>
              </div>

              <div>
                <strong>
                  {a.fakeReviewAI.rating}
                </strong>
                <span>Average rating</span>
              </div>

              <div>
                <strong>
                  {a.fakeReviewAI.reviewCount}
                </strong>
                <span>Total reviews</span>
              </div>

            </div>


            <div className="anomaly">

              <Search size={18} />

              Rating anomaly:
              <strong>
                {a.fakeReviewAI.ratingAnomaly}
              </strong>

            </div>


            <h3>Authenticity Explanation</h3>

            {a.fakeReviewAI.reasons.map(
              (reason, index) => (

                <div
                  className="security-reason"
                  key={index}
                >
                  <CheckCircle size={16} />
                  {reason}
                </div>

              )
            )}

          </div>


        </section>


        <section className="agent-security">

          <div className="agent-heading">

            <div className="agent-icon">
              <Bot size={30} />
            </div>

            <div>
              <h2>Agent Security Gateway</h2>
              <p>
                Protecting autonomous shopping actions
                before money is spent.
              </p>
            </div>

          </div>


          <div className="agent-grid">


            <div className="agent-score">

              <Lock size={22} />

              <span>Permission Score</span>

              <strong>
                {a.agentSecurity.permissionScore}
              </strong>

              <small>/100</small>

            </div>


            <div className="agent-action">

              {a.agentSecurity.action === "ALLOW" ? (
                <CheckCircle size={25} />
              ) : a.agentSecurity.action === "CONFIRM" ? (
                <AlertTriangle size={25} />
              ) : (
                <Ban size={25} />
              )}

              <div>
                <span>AI ACTION</span>
                <strong>
                  {a.agentSecurity.action}
                </strong>
              </div>

            </div>


            <div className="agent-protection">

              <ShoppingCart size={22} />

              <div>
                <strong>
                  Autonomous Shopping Protected
                </strong>

                <span>
                  Purchase confirmation:
                  {" "}
                  {a.agentSecurity.purchaseConfirmationRequired
                    ? "REQUIRED"
                    : "NOT REQUIRED"}
                </span>
              </div>

            </div>

          </div>


          <div className="agent-warning-list">

            <h3>
              Security Actions
            </h3>

            {a.agentSecurity.suspiciousActions.map(
              (item, index) => (

                <div
                  className="agent-warning"
                  key={index}
                >

                  <AlertTriangle size={17} />

                  {item}

                </div>

              )
            )}

          </div>

        </section>


        <section className="security-footer">

          <ShieldCheck size={28} />

          <div>

            <strong>
              ShopGuard Security Protection
            </strong>

            <p>
              AI evaluates the product before an autonomous
              shopping agent can proceed with a purchase.
            </p>

          </div>

          <Link
            to={`/decision-dashboard/${product.id}`}
            className="security-button"
          >
            View Final Decision
          </Link>

        </section>


      </main>

    </div>
  );
}
