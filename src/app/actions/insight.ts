import { parseCookies } from "nookies";

const BASE_URL = "http://localhost:8083"; // To be provided as env var.

const { ["falcon.token"]: token } = parseCookies();

async function getInsights({ city, isAuthenticated }: any) {
  let headers: any = {
    "Content-Type": "application/json",
  };

  if (isAuthenticated) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/falcon/insight?city=${city}`, {
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getHistoricalInsights(city: String) {
  try {
    const res = await fetch(
      `http://localhost:8083/falcon/insights/historical?city=${city}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("Response Data:", data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getInsights, getHistoricalInsights };
