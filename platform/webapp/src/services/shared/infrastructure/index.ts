/**
 * Shared API client for generated domain services.
 */

export type ApiResponse<T> = { data: T; meta?: Record<string, unknown> };

const API_KEY =
  (import.meta as ImportMeta & { env: Record<string, string> }).env
    ?.VITE_API_KEY ?? "splitward_demo_local_dev_key";

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-API-Key": API_KEY,
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    headers["Idempotency-Key"] =
      headers["Idempotency-Key"] ??
      `web_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
  const res = await fetch(path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} failed (${res.status}): ${text}`);
  }
  if (res.status === 204) return { data: undefined as T };
  return (await res.json()) as ApiResponse<T>;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => request<T>("GET", path, undefined, init),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>("POST", path, body, init),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>("PATCH", path, body, init),
  delete: <T>(path: string, init?: RequestInit) =>
    request<T>("DELETE", path, undefined, init),
};
