import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f8fc",
      padding: "30px"
    }}>

      <header style={{
        maxWidth: "1200px",
        margin: "0 auto 35px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{
            margin: 0,
            color: "#172033"
          }}>
            ShopGuard AI
          </h1>

          <p style={{
            color: "#69758a",
            marginTop: "8px"
          }}>
            Intelligent protection for smarter online shopping
          </p>
        </div>

        <Link
          to="/products"
          style={{
            background: "#3154d9",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "700"
          }}
        >
          Browse Products
        </Link>
      </header>

      <main style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>

        <section style={{
          background: "#172033",
          color: "#fff",
          borderRadius: "24px",
          padding: "40px",
          marginBottom: "28px"
        }}>

          <div style={{
            maxWidth: "700px"
          }}>

            <div style={{
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1px",
              opacity: 0.8
            }}>
              SHOPGUARD DECISION INTELLIGENCE
            </div>

            <h2 style={{
              fontSize: "38px",
              margin: "14px 0"
            }}>
              Shop smarter.
              <br />
              Buy with confidence.
            </h2>

            <p style={{
              lineHeight: "1.7",
              opacity: 0.8
            }}>
              ShopGuard AI evaluates price, seller trust, review authenticity,
              product quality, security and purchase risk before you spend money.
            </p>

            <Link
              to="/decision-dashboard/1"
              style={{
                display: "inline-block",
                marginTop: "15px",
                background: "#fff",
                color: "#172033",
                padding: "13px 22px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "700"
              }}
            >
              View AI Decision
            </Link>

          </div>
        </section>

        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "18px"
        }}>

          <Feature
            icon=""
            title="Price Intelligence"
            text="Find fair prices, discounts and negotiation targets."
            link="/product/1"
          />

          <Feature
            icon=""
            title="Security Intelligence"
            text="Detect scams, suspicious claims and risky sellers."
            link="/security-center/1"
          />

          <Feature
            icon=""
            title="Fake Review AI"
            text="Evaluate review authenticity and rating anomalies."
            link="/security-center/1"
          />

          <Feature
            icon=""
            title="AI Negotiator"
            text="Generate a realistic price to request from sellers."
            link="/negotiator/1"
          />

        </section>

        <section style={{
          marginTop: "28px",
          background: "#fff",
          borderRadius: "20px",
          padding: "28px",
          border: "1px solid #e3e7ef"
        }}>

          <h2 style={{
            marginTop: 0,
            color: "#172033"
          }}>
            AeroBook Pro 15
          </h2>

          <p style={{
            color: "#69758a"
          }}>
            Latest analyzed product
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            marginTop: "20px"
          }}>

            <Metric title="AI Decision" value="BUY" />
            <Metric title="Decision Score" value="91/100" />
            <Metric title="Security" value="92/100" />
            <Metric title="Seller Trust" value="94/100" />

          </div>

          <Link
            to="/product/1"
            style={{
              display: "inline-block",
              marginTop: "24px",
              color: "#3154d9",
              fontWeight: "700",
              textDecoration: "none"
            }}
          >
            View complete product analysis 
          </Link>

        </section>

      </main>
    </div>
  );
}

function Feature({ icon, title, text, link }) {
  return (
    <Link
      to={link}
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "18px",
        border: "1px solid #e3e7ef",
        textDecoration: "none",
        color: "#172033"
      }}
    >
      <div style={{
        fontSize: "30px",
        marginBottom: "12px"
      }}>
        {icon}
      </div>

      <h3 style={{
        margin: "0 0 10px"
      }}>
        {title}
      </h3>

      <p style={{
        color: "#69758a",
        fontSize: "14px",
        lineHeight: "1.6",
        marginBottom: 0
      }}>
        {text}
      </p>
    </Link>
  );
}

function Metric({ title, value }) {
  return (
    <div style={{
      padding: "18px",
      background: "#f6f8fc",
      borderRadius: "14px"
    }}>
      <div style={{
        color: "#69758a",
        fontSize: "13px"
      }}>
        {title}
      </div>

      <strong style={{
        display: "block",
        marginTop: "8px",
        fontSize: "22px",
        color: "#172033"
      }}>
        {value}
      </strong>
    </div>
  );
}
