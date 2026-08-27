import { Link } from "react-router-dom";
import { Camera, ImagePlus, ShieldCheck } from "lucide-react";

export default function Room2Cart() {
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

        <Camera size={65} />

        <h1>Room2Cart AI</h1>

        <p>
          Upload a room image and ShopGuard AI will identify
          the environment and recommend compatible products.
        </p>

        <label className="upload-box">

          <ImagePlus size={45} />

          <strong>
            Upload Room Image
          </strong>

          <span>
            JPG, PNG or WEBP
          </span>

          <input
            type="file"
            accept="image/*"
            hidden
          />

        </label>

        <p className="muted">
          Computer Vision engine will analyze your image.
        </p>

      </main>

    </div>
  );
}
