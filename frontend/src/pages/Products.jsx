import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Search } from "lucide-react";
import { getProducts } from "../services/api";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts()
      .then(response => setProducts(response.data))
      .catch(console.error);
  }, []);

  async function searchProducts(value) {

    setSearch(value);

    const response = await getProducts(value);

    setProducts(response.data);
  }

  return (
    <div className="app">

      <header className="navbar">

        <Link to="/home" className="brand">

          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>

          ShopGuard <strong>AI</strong>

        </Link>

        <div className="search">

          <Search size={20} />

          <input
            value={search}
            onChange={e => searchProducts(e.target.value)}
            placeholder="Search products..."
          />

        </div>

        <Link to="/cart">
          ?? Cart
        </Link>

      </header>

      <main className="section">

        <h1>Explore Products</h1>

        <p className="muted">
          Every product can be evaluated by ShopGuard AI.
        </p>

        <div className="products">

          {products.map(product => (

            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product"
            >

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="product-body">

                <small>{product.category}</small>

                <h3>{product.name}</h3>

                <div className="rating">
                  ? {product.rating}
                </div>

                <div className="price">
                  ?{product.price.toLocaleString("en-IN")}
                </div>

                <div className="product-trust">
                  <span>
                    ??? Trust {product.sellerTrust}
                  </span>

                  <span>
                    ?? Eco {product.ecoScore}
                  </span>
                </div>

              </div>

            </Link>

          ))}

        </div>

      </main>

    </div>
  );
}
