import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionOptions } from "iron-session";

export interface SessionData {
  isAdmin: boolean;
}

export const defaultSession: SessionData = {
  isAdmin: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long",
  cookieName: "testimonial_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isAdmin) {
    session.isAdmin = defaultSession.isAdmin;
  }
  return session;
}
