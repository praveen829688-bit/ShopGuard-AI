import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  MessageCircle,
  TrendingDown,
  Copy,
  CheckCircle,
  Brain,
  ShieldCheck,
  ArrowLeft,
  Wallet,
  Target
} from "lucide-react";

export default function Negotiator() {

  const { id = "1" } = useParams();

  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:5000/api/negotiation/${id}`
      )
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [id]);


  const copyMessage = async () => {

    if (!data) return;

    await navigator.clipboard.writeText(
      data.analysis.message
    );

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      2000
    );
  };


  if (!data) {

    return (
      <div className="negotiator-loading">

        <Brain size={45} />

        <h2>
          ShopGuard AI is calculating your target price...
        </h2>

        <p>
          Evaluating price, quality, seller trust and reviews.
        </p>

      </div>
    );

  }


  const product = data.product;
  const a = data.analysis;


  return (

    <div className="negotiator-page">

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


      <main className="negotiator-container">

        <Link
          to={`/product/${product.id}`}
          className="negotiator-back"
        >
          <ArrowLeft size={18} />
          Back to Product
        </Link>


        <section className="negotiator-heading">

          <div className="negotiator-badge">
            <MessageCircle size={17} />
            SHOPGUARD AI NEGOTIATOR
          </div>

          <h1>
            Get a Better Price
          </h1>

          <p>
            AI calculates a realistic negotiation target
            using product value, seller trust, review trust
            and current pricing.
          </p>

        </section>


        <section className="negotiator-product">

          <img
            src={product.image}
            alt={product.name}
          />

          <div>

            <span>
              {product.brand}  {product.category}
            </span>

            <h2>
              {product.name}
            </h2>

            <div className="current-price">
              {a.currentPrice.toLocaleString("en-IN")}
            </div>

            <p>
              Current listed price
            </p>

          </div>

        </section>


        <section className="negotiator-grid">


          <div className="negotiator-card target-card">

            <div className="card-icon">
              <Target size={22} />
            </div>

            <span>
              AI NEGOTIATION TARGET
            </span>

            <strong>
              {a.targetPrice.toLocaleString("en-IN")}
            </strong>

            <p>
              Suggested price to request from the seller.
            </p>

            <div className="saving">

              <TrendingDown size={18} />

              Potential savings:
              <strong>
                {a.potentialSavings.toLocaleString("en-IN")}
              </strong>

            </div>

          </div>


          <div className="negotiator-card">

            <div className="card-icon">
              <Wallet size={22} />
            </div>

            <span>
              ESTIMATED FAIR PRICE
            </span>

            <strong>
              {a.estimatedFairPrice.toLocaleString("en-IN")}
            </strong>

            <p>
              AI-estimated value based on available signals.
            </p>

            <div className="negotiation-status">
              {a.recommendation}
            </div>

          </div>


          <div className="negotiator-card">

            <div className="card-icon">
              <ShieldCheck size={22} />
            </div>

            <span>
              MAXIMUM RECOMMENDED PRICE
            </span>

            <strong>
              {a.maximumPrice.toLocaleString("en-IN")}
            </strong>

            <p>
              ShopGuard recommends staying below this level.
            </p>

            <div className="negotiation-strength">
              {a.negotiationStrength} NEGOTIATION
            </div>

          </div>

        </section>


        <section className="message-card">

          <div className="message-header">

            <div>

              <h2>
                <MessageCircle size={22} />
                AI Negotiation Message
              </h2>

              <p>
                Copy this message and send it to the seller.
              </p>

            </div>

            <button
              onClick={copyMessage}
              className="copy-button"
            >

              {copied
                ? <CheckCircle size={18} />
                : <Copy size={18} />
              }

              {copied
                ? "Copied"
                : "Copy Message"
              }

            </button>

          </div>


          <div className="message-box">
            {a.message}
          </div>

        </section>


        <section className="reason-card">

          <h2>
            <Brain size={22} />
            Why ShopGuard chose this target
          </h2>

          {a.reasons.map(
            (reason, index) => (

              <div
                className="negotiation-reason"
                key={index}
              >

                <CheckCircle size={17} />

                {reason}

              </div>

            )
          )}

        </section>


      </main>

    </div>

  );
}
