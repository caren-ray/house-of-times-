import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "house-of-time-super-secret-key-2026-secure-3466-updated";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Simple hardcoded check for reliability during development
  // In production, these should ideally be in env vars too
  const validUser = process.env.ADMIN_USER || "Ray";
  const validPass = process.env.ADMIN_PASS || "Ray#20243466";

  if (username === validUser && password === validPass) {
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ username, expires });

    const cookieStore = await cookies();
    cookieStore.set("session", session, { 
      expires, 
      httpOnly: true, 
      path: "/", 
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
    return true;
  }
  return false;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { 
    expires: new Date(0),
    path: "/"
  });
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}
