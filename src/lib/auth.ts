import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "house-of-time-super-secret-key-2026-secure-3466-updated";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Simple hardcoded check for reliability during development
  const validUser = "Ray";
  const validPass = "Ray#20243466";

  if (username === validUser && password === validPass) {
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ username, expires });

    const cookieStore = await cookies();
    cookieStore.set("session", session, { 
      expires, 
      httpOnly: true, 
      path: "/", 
      sameSite: "lax",
      secure: false // Set to false to work on both HTTP and HTTPS tunnels
    });
    return true;
  }
  return false;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
