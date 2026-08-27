import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Brain,
  TrendingUp,
  Handshake,
  CheckCircle,
  AlertTriangle,
  Star,
  Store,
  FileCheck,
  ShieldAlert
} from "lucide-react";
import axios from "axios";

export default function ProductDetails() {

  const { id } = useParams();

  const [data, setData] = useState(null);
  const [truth, setTruth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadData() {

      try {

        const [priceResponse, truthResponse] =
          await Promise.all([
            axios.get(
              `http://127.0.0.1:5000/api/price-intelligence/${id}`
            ),
            axios.get(
              `http://127.0.0.1:5000/api/product-truth/${id}`
            )
          ]);

        setData(priceResponse.data);
        setTruth(truthResponse.data.analysis);

      } catch (error) {

        console.error("ShopGuard AI error:", error);

      } finally {

        setLoading(false);

      }

    }

    loadData();

  }, [id]);


  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center"
      }}>
        <div style={{ textAlign: "center" }}>
          <Brain size={42} color="#4263eb" />
          <h2>ShopGuard AI is analyzing...</h2>
          <p>Checking price, reviews, seller and product trust.</p>
        </div>
      </div>
    );
  }


  if (!data || !truth) {
    return (
      <div style={{
        padding: "100px",
        textAlign: "center"
      }}>
        <h2>Unable to analyze product.</h2>
        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }


  const product = data.product;
  const priceAI = data.analysis;


  return (

    <div className="app">

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


      <main style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "35px 25px"
      }}>

        <Link
          to="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#4263eb",
            textDecoration: "none",
            marginBottom: "25px"
          }}
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>


        {/* PRODUCT */}

        <section className="product-detail-grid">

          <div className="product-image-card">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>


          <div className="product-info">

            <small>
              {product.brand}  {product.category}
            </small>

            <h1>{product.name}</h1>

            <div className="product-rating">
              <Star size={18} fill="currentColor" />
              {product.rating}
              <span>
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="product-price">

              {product.price.toLocaleString("en-IN")}

              <del>
                {product.originalPrice.toLocaleString("en-IN")}
              </del>

            </div>


            <div className="product-trust-row">

              <span>
                <ShieldCheck size={17} />
                Seller Trust {product.sellerTrust}%
              </span>

              <span>
                <CheckCircle size={17} />
                Review Trust {product.reviewTrust}%
              </span>

            </div>


            <div className="product-features">

              {product.features.map((feature, index) => (
                <div key={index}>
                   {feature}
                </div>
              ))}

            </div>

          </div>

        </section>


        {/* PRICE INTELLIGENCE */}

        <section className="price-ai-panel">

          <div className="price-ai-header">

            <div>

              <div className="ai-badge">
                <Brain size={16} />
                SHOPGUARD PRICE AI
              </div>

              <h2>
                Is This Really a Good Price?
              </h2>

              <p>
                ShopGuard evaluates price,
                quality, seller trust and discount signals.
              </p>

            </div>


            <div className="price-status">
              <CheckCircle size={22} />
              {priceAI.status}
            </div>

          </div>


          <div className="price-metrics">

            <div className="price-metric">
              <span>Current Price</span>
              <strong>
                {priceAI.currentPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="price-metric">
              <span>Estimated Fair Price</span>
              <strong>
                {priceAI.estimatedFairPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="price-metric">
              <span>Discount</span>
              <strong>
                {priceAI.discountPercent}%
              </strong>
            </div>

            <div className="price-metric">
              <span>Discount Quality</span>
              <strong>
                {priceAI.discountQuality}
              </strong>
            </div>

          </div>


          <div className="negotiation-card">

            <div className="negotiation-icon">
              <Handshake size={28} />
            </div>

            <div>

              <h3>AI Negotiation Target</h3>

              <p>
                Suggested target price:
              </p>

              <strong className="target-price">
                {priceAI.targetNegotiationPrice.toLocaleString("en-IN")}
              </strong>

              <p>
                Potential savings:
                <b>
                  {" "}{priceAI.potentialSavings.toLocaleString("en-IN")}
                </b>
              </p>

            </div>

            <button
              className="primary-btn"
              onClick={() =>
                navigator.clipboard?.writeText(
                  `Would you consider ${priceAI.targetNegotiationPrice.toLocaleString("en-IN")} for this product?`
                )
              }
            >
              <Handshake size={17} />
              Copy Negotiation Message
            </button>

          </div>


          <div className="price-recommendation">

            <TrendingUp size={20} />

            <strong>AI Recommendation:</strong>

            <span>
              {priceAI.recommendation}
            </span>

          </div>


          <div className="price-reasons">

            <h3>Why ShopGuard thinks this</h3>

            {priceAI.reasons.map((reason, index) => (
              <div key={index}>
                <CheckCircle size={16} />
                {reason}
              </div>
            ))}

          </div>

        </section>


        {/* PRODUCT TRUTH AI */}

        <section className="truth-ai-panel">

          <div className="truth-header">

            <div>

              <div className="ai-badge truth-badge">
                <ShieldCheck size={16} />
                SHOPGUARD PRODUCTTRUTH AI
              </div>

              <h2>
                Can You Trust This Product?
              </h2>

              <p>
                AI analyzes review authenticity, seller credibility,
                product claims, scam signals and return risk.
              </p>

            </div>


            <div className={
              truth.riskLevel === "LOW"
                ? "truth-status"
                : "truth-status warning"
            }>

              {truth.riskLevel === "LOW"
                ? <CheckCircle size={22} />
                : <AlertTriangle size={22} />
              }

              {truth.overallStatus}

            </div>

          </div>


          {/* TRUST SCORE */}

          <div className="truth-score-box">

            <div className="truth-score-circle">

              <strong>
                {truth.trustScore}
              </strong>

              <span>
                /100
              </span>

            </div>

            <div>

              <h3>
                Product Trust Score
              </h3>

              <p>
                Overall confidence calculated from multiple
                independent trust signals.
              </p>

            </div>

          </div>


          {/* TRUST METRICS */}

          <div className="truth-metrics">


            <div className="truth-metric">

              <div className="truth-icon">
                <Star size={22} />
              </div>

              <span>Review Authenticity</span>

              <strong>
                {truth.reviews.reviewTrust}%
              </strong>

              <small>
                {truth.reviews.status}
              </small>

            </div>


            <div className="truth-metric">

              <div className="truth-icon">
                <Store size={22} />
              </div>

              <span>Seller Trust</span>

              <strong>
                {truth.seller.sellerTrust}%
              </strong>

              <small>
                {truth.seller.status}
              </small>

            </div>


            <div className="truth-metric">

              <div className="truth-icon">
                <FileCheck size={22} />
              </div>

              <span>Claim Reliability</span>

              <strong>
                {truth.claims.score}%
              </strong>

              <small>
                {truth.claims.status}
              </small>

            </div>


            <div className="truth-metric">

              <div className="truth-icon">
                <ShieldAlert size={22} />
              </div>

              <span>Scam Risk</span>

              <strong>
                {truth.scam.score}%
              </strong>

              <small>
                {truth.scam.level}
              </small>

            </div>

          </div>


          {/* REVIEW DETAILS */}

          <div className="truth-review-summary">

            <div>

              <strong>
                {truth.reviews.reviewCount.toLocaleString("en-IN")}
              </strong>

              <span>
                Total Reviews
              </span>

            </div>

            <div>

              <strong>
                {truth.reviews.rating} 
              </strong>

              <span>
                Average Rating
              </span>

            </div>

            <div>

              <strong>
                {truth.reviews.estimatedSuspiciousPercent}%
              </strong>

              <span>
                Estimated Suspicious
              </span>

            </div>

            <div>

              <strong>
                {truth.returns.risk}%
              </strong>

              <span>
                Return Risk
              </span>

            </div>

          </div>


          {/* EXPLANATION */}

          <div className="truth-explanation">

            <h3>
              Why ShopGuard trusts this product
            </h3>

            {truth.reasons.map((reason, index) => (

              <div key={index}>

                <CheckCircle size={17} />

                {reason}

              </div>

            ))}

          </div>


          {/* WARNINGS */}

          {truth.warnings.length > 0 && (

            <div className="truth-warnings">

              <h3>
                <AlertTriangle size={18} />
                Warnings
              </h3>

              {truth.warnings.map((warning, index) => (
                <div key={index}>
                   {warning}
                </div>
              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}
