export type AuthUser = {
  username: string;
  email?: string;
  fullname?: string;
  address?: string;
};

type ApiResponse<T> = {
  statusCode?: number;
  data?: T;
  message?: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
const USERS_BASE = `${BACKEND_URL}/AccredianEnterprise/v1/users`;
const STORAGE_KEY = "accredian_auth_user";
const TOKEN_KEY = "accredian_access_token";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function getAuthorizedHeaders() {
  const token = getAccessToken();
  return token ? { ...defaultHeaders, Authorization: `Bearer ${token}` } : defaultHeaders;
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("auth-changed"));
}

export async function registerUser(payload: {
  fullname: string;
  username: string;
  email: string;
  address: string;
  password: string;
}) {
  const response = await fetch(`${USERS_BASE}/register`, {
    method: "POST",
    headers: defaultHeaders,
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ApiResponse<{
    email: string;
    verificationUrl?: string;
  }>;

  if (!response.ok) {
    throw new Error(data?.message ?? "Registration failed");
  }

  return data;
}

export async function verifyEmail(token: string, id: string) {
  const searchParams = new URLSearchParams({ token, id });
  const response = await fetch(`${USERS_BASE}/verify-email?${searchParams.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  const data = (await response.json()) as ApiResponse<Record<string, never>>;

  if (!response.ok) {
    throw new Error(data?.message ?? "Email verification failed");
  }

  return data;
}

export async function loginUser(payload: { email?: string; username?: string; password: string }) {
  const response = await fetch(`${USERS_BASE}/login`, {
    method: "POST",
    headers: defaultHeaders,
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ApiResponse<{
    accessToken?: string;
    user?: {
      username: string;
      email: string;
    };
  }>;

  if (!response.ok) {
    throw new Error(data?.message ?? "Login failed");
  }

  if (typeof window !== "undefined") {
    const user = data?.data?.user;
    const accessToken = data?.data?.accessToken;

    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ username: user.username, email: user.email }));
    }

    if (accessToken) {
      window.localStorage.setItem(TOKEN_KEY, accessToken);
    }

    window.dispatchEvent(new Event("auth-changed"));
  }

  return data;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const meResponse = await fetch(`${USERS_BASE}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (meResponse.ok) {
    const meData = (await meResponse.json()) as {
      loggedIn: boolean;
      user: AuthUser | null;
    };

    if (meData.loggedIn && meData.user) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(meData.user));
      }
      return meData.user;
    }
  }

  if (typeof window === "undefined") return null;
  const token = getAccessToken();
  if (!token) return getStoredUser();

  const usernameResponse = await fetch(`${USERS_BASE}/getusername`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!usernameResponse.ok) {
    return getStoredUser();
  }

  const usernameData = (await usernameResponse.json()) as ApiResponse<{ username: string }>;
  const username = usernameData?.data?.username;

  if (!username) return getStoredUser();

  const user: AuthUser = { username };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function logoutUser() {
  const response = await fetch(`${USERS_BASE}/logout`, {
    method: "POST",
    headers: getAuthorizedHeaders(),
    credentials: "include",
  });

  const data = (await response.json()) as ApiResponse<Record<string, never>>;

  if (!response.ok) {
    throw new Error(data?.message ?? "Logout failed");
  }

  clearStoredAuth();
  return data;
}

export async function updateAccountDetails(payload: {
  username?: string;
  email?: string;
  fullname?: string;
  address?: string;
}) {
  const response = await fetch(`${USERS_BASE}/updatedetails`, {
    method: "POST",
    headers: getAuthorizedHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ApiResponse<AuthUser>;

  if (!response.ok) {
    throw new Error(data?.message ?? "Updating details failed");
  }

  const updatedUser = data?.data;
  if (typeof window !== "undefined" && updatedUser) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("auth-changed"));
  }

  return data;
}

export async function changePassword(payload: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const response = await fetch(`${USERS_BASE}/changepassword`, {
    method: "POST",
    headers: getAuthorizedHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ApiResponse<Record<string, never>>;

  if (!response.ok) {
    throw new Error(data?.message ?? "Password change failed");
  }

  return data;
}

export async function deleteAccount() {
  const response = await fetch(`${USERS_BASE}/deleteuser`, {
    method: "POST",
    headers: getAuthorizedHeaders(),
    credentials: "include",
  });

  const data = (await response.json()) as ApiResponse<Record<string, never>>;

  if (!response.ok) {
    throw new Error(data?.message ?? "Delete account failed");
  }

  clearStoredAuth();
  return data;
}
