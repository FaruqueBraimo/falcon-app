const BASE_URL = "http://localhost:8083"; // To be provided as env var.

async function signIn({ username, password }: any) {
  try {
    const res = await fetch(`${BASE_URL}/falcon/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    return res.json();
  } catch (error) {
    alert("error");
  }
}

async function signUp({ username, password }: any) {
  try {
    const res = await fetch(`${BASE_URL}/falcon/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    alert("Success. Use your credentials to login");
    window.location.href = "/";
  } catch (error) {
    alert("error");
  }
}

export { signIn, signUp };
