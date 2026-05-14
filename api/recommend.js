const { GoogleGenerativeAI } = require("@google/generative-ai");

const products = [
  { id: 1, name: "iPhone 13", category: "Phone", price: 699 },
  { id: 2, name: "Samsung Galaxy S21", category: "Phone", price: 499 },
  { id: 3, name: "OnePlus 11R", category: "Phone", price: 450 },
];

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { preference } = req.body || {};
  if (!preference) return res.status(400).json({ error: "Missing preference" });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Available products:
${JSON.stringify(products)}

User preference:
${preference}

Return ONLY a raw JSON array of matching product IDs with no markdown, no backticks, no explanation.

Example output:
[2,3]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // ✅ FIX: Strip markdown code fences that Gemini sometimes wraps around JSON
    const cleaned = text.replace(/```json|```/gi, "").trim();
    const ids = JSON.parse(cleaned);

    const recommended = products.filter((p) => ids.includes(p.id));
    return res.json(recommended);

  } catch (aiError) {
    console.error("Gemini API error:", aiError.message);

    // Fallback: simple keyword matching
    let recommended = [];
    const pref = (preference || "").toLowerCase();

    if (pref.includes("under") || pref.includes("budget") || pref.includes("cheap")) {
      recommended = products.filter((p) => p.price < 500);
    } else {
      recommended = products;
    }

    return res.json(recommended);
  }
}
