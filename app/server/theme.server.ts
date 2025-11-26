import { parse } from "cookie";

export async function getUserTheme(request: Request): Promise<"light" | "dark"> {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = cookieHeader ? parse(cookieHeader) : {};
    return cookies.theme === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}
