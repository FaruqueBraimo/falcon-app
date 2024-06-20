import { parseCookies } from "nookies";

const BASE_URL = "http://localhost:8083"; // To be provided as env var.

const { ["falcon.token"]: token } = parseCookies();

async function getInsights({ city, isAuthenticated }: any) {
  try {
    const enconded = encodeURIComponent(city);
    let headers: any = {
      "Content-Type": "application/json",
    };

    if (isAuthenticated) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}/falcon/insight?city=${enconded}`, {
      headers: headers,
    });
    const data = await res.json();

    if (data?.status) {
      return {
        error: data?.message,
      };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

async function getHistoricalInsights(city: String) {
  try {
    const res = await fetch(
      `${BASE_URL}/falcon/insights/historical?city=${city}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data?.status) {
      return {
        error: data?.message,
      };
    }
    return data;
  } catch (error) {
    return { error: error };
  }
}

export { getInsights, getHistoricalInsights };
