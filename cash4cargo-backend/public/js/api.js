const API_BASE = window.API_BASE || "/api";

async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = localStorage.getItem("c4c_token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  try {
    data = await response.json();
  } catch (_) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `API алдаа: ${response.status}`);
  }

  return data;
}

export function getSession() {
  const token = localStorage.getItem("c4c_token");
  const userText = localStorage.getItem("c4c_user");
  if (!token || !userText) return null;

  try {
    return { token, user: JSON.parse(userText) };
  } catch (_) {
    clearSession();
    return null;
  }
}

export function saveSession(token, user) {
  localStorage.setItem("c4c_token", token);
  localStorage.setItem("c4c_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("c4c_token");
  localStorage.removeItem("c4c_user");
}

export const authAPI = {
  login(phone, password) {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, password }),
    });
  },

  register(name, phone, password) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, phone, password }),
    });
  },
};

export const shipmentAPI = {
  create(payload) {
    return apiFetch("/shipments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  trackByCode(code) {
    return apiFetch(`/shipments/track/${encodeURIComponent(code)}`);
  },

  trackByPhone(phone) {
    return apiFetch(`/shipments/by-phone/${encodeURIComponent(phone)}`);
  },
};

export const faqAPI = {
  list() {
    return apiFetch("/faqs");
  },
};
