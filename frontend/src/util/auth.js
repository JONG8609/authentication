import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (!storedExpirationDate) return 0; // 추가
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  if (typeof localStorage === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  const tokenDuration = getTokenDuration();
  if (tokenDuration <= 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  try {
    return getAuthToken();
  } catch (err) {
    console.error("tokenLoader failed:", err);
    throw err; // 반드시 Error 객체를 던져야 errorElement에 안전하게 전달됨
  }
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  // 토큰이 있으면 그대로 진행 (필요 시 반환해도 됨)
  return null;
}
