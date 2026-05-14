import { useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import products from "./products";

function App() {
  const [preference, setPreference] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = async () => {
    try {
      const response = await axios.post(
        "/api/recommend",
        {
          preference,
        }
      );

      setRecommendations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Product Recommendation System</h1>

      <input
        type="text"
        placeholder="Example: I want a phone under $500"
        value={preference}
        onChange={(e) => setPreference(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
        }}
      />

      <button
        onClick={getRecommendations}
        style={{
          marginLeft: "10px",
          padding: "10px",
        }}
      >
        Get Recommendations
      </button>

      <h2>All Products</h2>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <h2>Recommended Products</h2>

      {recommendations.length > 0 ? (
        recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No recommendations yet.</p>
      )}
    </div>
  );
}export default App;