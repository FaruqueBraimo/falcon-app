const BASE_URL = "http://localhost:8083"; // To be provided as env var.

async function getInsights(city: String) {
  const res = await fetch(`${BASE_URL}/insight?city=${city}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export { getInsights };
