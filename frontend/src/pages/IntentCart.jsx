import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import axios from "axios";

export default function IntentCart() {

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function buildCart() {

    if (!message.trim()) {
      setError("Please describe what you want to buy.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/api/intent",
        {
          message: message
        }
      );

      console.log("IntentCart response:", response.data);

      setResult(response.data);

    } catch (err) {

      console.error("IntentCart error:", err);

      setError(
        "Unable to connect to ShopGuard AI. Make sure Flask is running."
      );

    } finally {

      setLoading(false);

    }
  }


  function useExample(text) {

    setMessage(text);
    setResult(null);
    setError("");

  }


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


        <Link to="/assistant">
          AI Assistant
        </Link>

      </header>


      <main className="intent-page">


        <section className="intent-hero">

          <div className="ai-badge">

            <Sparkles size={16} />

            INTENTCART AI

          </div>


          <h1>
            Tell ShopGuard What You Need
          </h1>


          <p>

            Describe your shopping requirements naturally.
            ShopGuard AI understands your goal, analyzes
            products and builds your personalized shortlist.

          </p>


          <div className="intent-input">

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Example: I need a laptop for coding under 60,000 with 16GB RAM and low return risk..."
            />


            <button
              className="primary-btn"
              onClick={buildCart}
              disabled={loading}
            >

              <Brain size={19} />

              {loading
                ? "Analyzing Your Requirements..."
                : "Build My Smart Cart"
              }

              <ArrowRight size={18} />

            </button>

          </div>


          {error && (

            <div className="intent-error">

              <AlertTriangle size={18} />

              {error}

            </div>

          )}


          <div className="intent-examples">

            <button
              onClick={() =>
                useExample(
                  "I need a laptop for coding under 60000 with 16GB RAM and low return risk"
                )
              }
            >
               Coding Laptop
            </button>


            <button
              onClick={() =>
                useExample(
                  "I need a smartphone under 30000 with high trust and good quality"
                )
              }
            >
               Smartphone
            </button>


            <button
              onClick={() =>
                useExample(
                  "I need an eco friendly home product with low return risk"
                )
              }
            >
               Eco Product
            </button>

          </div>

        </section>


        {result && (

          <section className="intent-results">


            <div className="intent-detected">

              <h2>

                <Brain size={22} />

                ShopGuard Understood Your Intent

              </h2>


              <div className="intent-tags">


                {result.intent.category && (

                  <span>
                    Category:
                    <b>
                      {result.intent.category}
                    </b>
                  </span>

                )}


                {result.intent.budget && (

                  <span>
                    Budget:
                    <b>
                      {result.intent.budget.toLocaleString("en-IN")}
                    </b>
                  </span>

                )}


                {result.intent.ram && (

                  <span>
                    RAM:
                    <b>
                      {result.intent.ram}GB+
                    </b>
                  </span>

                )}


                {result.intent.purpose && (

                  <span>
                    Purpose:
                    <b>
                      {result.intent.purpose}
                    </b>
                  </span>

                )}


                {result.intent.lowReturnRisk && (

                  <span>

                    <CheckCircle size={14} />

                    Low Return Risk

                  </span>

                )}


                {result.intent.highTrust && (

                  <span>

                    <ShieldCheck size={14} />

                    High Trust

                  </span>

                )}

              </div>

            </div>


            <div className="recommendation-header">

              <div>

                <h2>
                  Personalized Recommendations
                </h2>

                <p>
                  ShopGuard analyzed {result.totalMatches}
                  {" "}products for your requirements.
                </p>

              </div>


              <div className="ai-match-badge">

                AI MATCHING

              </div>

            </div>


            <div className="recommendation-grid">


              {result.recommendations.map(
                (item, index) => (

                  <div
                    className="intent-product"
                    key={item.product.id}
                  >


                    <div className="rank">
                      #{index + 1}
                    </div>


                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />


                    <div className="intent-product-body">


                      <small>
                        {item.product.category}
                      </small>


                      <h3>
                        {item.product.name}
                      </h3>


                      <div className="intent-price">

                        {item.product.price.toLocaleString("en-IN")}

                      </div>


                      <div className="intent-scores">


                        <span>

                          Intent Match

                          <b>
                            {item.intentScore}/100
                          </b>

                        </span>


                        <span>

                          AI Decision

                          <b>
                            {item.decisionScore}/100
                          </b>

                        </span>

                      </div>


                      <div className="progress">

                        <div
                          style={{
                            width: `${item.intentScore}%`
                          }}
                        />

                      </div>


                      <div className="decision-pill">

                        {item.decision === "BUY" && (
                          <CheckCircle size={16} />
                        )}

                        {item.decision === "WAIT" && (
                          <AlertTriangle size={16} />
                        )}

                        {item.decision === "AVOID" && (
                          <AlertTriangle size={16} />
                        )}

                        <strong>
                          {item.decision}
                        </strong>

                        <span>
                           {item.riskLevel} RISK
                        </span>

                      </div>


                      <div className="match-reasons">


                        {item.matchReasons
                          .slice(0, 3)
                          .map(
                            (reason, i) => (

                              <div key={i}>

                                <CheckCircle
                                  size={15}
                                />

                                {reason}

                              </div>

                            )
                          )}

                      </div>


                      {item.warnings.length > 0 && (

                        <div className="intent-warning">

                          <AlertTriangle
                            size={15}
                          />

                          {item.warnings[0]}

                        </div>

                      )}


                      <Link
                        to={`/product/${item.product.id}`}
                        className="primary-btn"
                      >

                        View Product

                        <ArrowRight size={17} />

                      </Link>


                    </div>

                  </div>

                )
              )}

            </div>

          </section>

        )}

      </main>

    </div>

  );

}
