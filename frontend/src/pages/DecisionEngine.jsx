import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  LockKeyhole,
  Leaf,
  Star,
  RotateCcw,
  ShoppingBag
} from "lucide-react";

import { getFullAnalysis } from "../services/api";


export default function DecisionEngine() {

  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [budget, setBudget] = useState("");

  useEffect(() => {

    loadAnalysis();

  }, [id]);


  async function loadAnalysis() {

    try {

      const response =
        await getFullAnalysis(
          id,
          budget
        );

      setResult(response.data);

    } catch (error) {

      console.error(error);

    }

  }


  if (!result) {

    return (
      <div className="loading">
        <ShieldCheck size={30} />
        Running ShopGuard AI analysis...
      </div>
    );

  }


  const product =
    result.product;

  const analysis =
    result.analysis;

  const factors =
    analysis.factors;


  const DecisionIcon =
    analysis.action === "BUY"
      ? CheckCircle
      : analysis.action === "WAIT"
      ? AlertTriangle
      : XCircle;


  return (

    <div className="app">


      <header className="navbar">

        <Link
          to="/home"
          className="brand"
        >

          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>

          ShopGuard <strong>AI</strong>

        </Link>


        <Link
          to={`/product/${product.id}`}
        >
          Back to Product
        </Link>

      </header>


      <main className="section">


        <div className="decision-heading">

          <div className="ai-badge">

            <ShieldCheck size={16} />

            EXPLAINABLE AI
            PURCHASE INTELLIGENCE

          </div>


          <h1>
            ShopGuard Decision Engine
          </h1>


          <p className="muted">

            Complete purchase-risk and
            value analysis for:

            <strong>
              {" "}{product.name}
            </strong>

          </p>

        </div>


        <div className="budget-box">

          <label>
            Your Maximum Budget
          </label>

          <div>

            <input
              type="number"
              placeholder="Example: 50000"
              value={budget}
              onChange={
                e =>
                  setBudget(
                    e.target.value
                  )
              }
            />

            <button
              className="primary-btn"
              onClick={
                loadAnalysis
              }
            >
              Recalculate AI
            </button>

          </div>

        </div>


        <div className="decision-card">


          <div
            className={
              `decision-score-${analysis.action.toLowerCase()}`
            }
          >

            {analysis.score}

          </div>


          <div className="score-label">
            / 100
          </div>


          <div className="decision-status">

            <DecisionIcon size={24} />

            {analysis.action}

          </div>


          <div className="risk-badge">

            Overall Risk:
            {" "}
            {analysis.riskLevel}

          </div>


          <h2>
            {product.name}
          </h2>


          <p>

            ShopGuard analyzed
            price, quality, seller,
            reviews, security,
            returns, compatibility,
            sustainability and
            buyer regret risk.

          </p>

        </div>


        <section className="advanced-panel">

          <h2>
            AI Intelligence Breakdown
          </h2>


          <div className="advanced-grid">


            <IntelligenceCard
              icon={<TrendingUp />}
              title="Price Intelligence"
              value={
                factors.price.score
              }
              subtitle={
                `${factors.price.discount}% discount  ${factors.price.status}`
              }
            />


            <IntelligenceCard
              icon={<LockKeyhole />}
              title="Seller Trust"
              value={
                factors.seller.score
              }
              subtitle={
                `${factors.seller.level}  ${
                  factors.seller.verified
                    ? "Verified"
                    : "Unverified"
                }`
              }
            />


            <IntelligenceCard
              icon={<Star />}
              title="Review Intelligence"
              value={
                factors.reviews.score
              }
              subtitle={
                `${factors.reviews.reviewCount} reviews  ${factors.reviews.status}`
              }
            />


            <IntelligenceCard
              icon={<ShieldCheck />}
              title="Scam Safety"
              value={
                factors.security
              }
              subtitle={
                `Scam risk: ${factors.scam.level}`
              }
            />


            <IntelligenceCard
              icon={<RotateCcw />}
              title="Return Prediction"
              value={
                100 - factors.returns.risk
              }
              subtitle={
                `${factors.returns.risk}% predicted return risk`
              }
            />


            <IntelligenceCard
              icon={<Leaf />}
              title="Eco Intelligence"
              value={
                factors.eco
              }
              subtitle={
                "Sustainability score"
              }
            />


            <IntelligenceCard
              icon={<ShoppingBag />}
              title="Compatibility"
              value={
                factors.compatibility
              }
              subtitle={
                "Requirement match"
              }
            />


            <IntelligenceCard
              icon={<AlertTriangle />}
              title="Regret Prediction"
              value={
                100 - factors.regret.score
              }
              subtitle={
                `${factors.regret.level} regret risk`
              }
            />

          </div>

        </section>


        <section className="explanation-panel">

          <h2>
            Why ShopGuard Recommends
            {" "}
            {analysis.action}
          </h2>


          {analysis.reasons.map(
            (reason, index) => (

              <div
                className="reason"
                key={index}
              >

                <CheckCircle
                  size={19}
                />

                {reason}

              </div>

            )
          )}


          {analysis.warnings.length > 0 && (

            <>

              <h3 className="warning-title">
                 Things to Consider
              </h3>


              {analysis.warnings.map(
                (warning, index) => (

                  <div
                    className="warning"
                    key={index}
                  >

                    <AlertTriangle
                      size={19}
                    />

                    {warning}

                  </div>

                )
              )}

            </>

          )}

        </section>


      </main>

    </div>

  );

}


function IntelligenceCard({
  icon,
  title,
  value,
  subtitle
}) {

  return (

    <div className="intelligence-card">

      <div className="intelligence-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <div className="intelligence-score">
        {value}
        <span>/100</span>
      </div>

      <p>
        {subtitle}
      </p>

      <div className="progress">

        <div
          style={{
            width: `${value}%`
          }}
        />

      </div>

    </div>

  );

}
