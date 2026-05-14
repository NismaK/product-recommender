const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const products = [
  {
    id: 1,
    name: "iPhone 13",
    category: "Phone",
    price: 699,
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    category: "Phone",
    price: 499,
  },
  {
    id: 3,
    name: "OnePlus 11R",
    category: "Phone",
    price: 450,
  },
];

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/recommend", async (req, res) => {
  try {
    const { preference } = req.body;

    try {
      const prompt = `
Available products:
${JSON.stringify(products)}

User preference:
${preference}

Return ONLY matching product IDs as JSON array.

Example:
[2,3]
`;

      const result = await model.generateContent(prompt);

      const response = await result.response;

      const text = response.text();

      const ids = JSON.parse(text);

      const recommendedProducts = products.filter((product) =>
        ids.includes(product.id)
      );

      return res.json(recommendedProducts);

    } catch (aiError) {

      console.log("Gemini API failed. Using fallback logic.");

      let recommendedProducts = [];

      if (
        preference.toLowerCase().includes("under") ||
        preference.toLowerCase().includes("budget")
      ) {
        recommendedProducts = products.filter(
          (product) => product.price < 500
        );
      } else {
        recommendedProducts = products;
      }

      return res.json(recommendedProducts);
    }

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});