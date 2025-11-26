import { prisma } from "@/lib/db.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

let JWT_SECRET: string;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
} else {
  JWT_SECRET = process.env.JWT_SECRET;
}

/**
 * Registers a new user.
 * @param {string} name - The user's full name.
 * @param {string} email - The user's email address (must be unique).
 * @param {string} password - The user's password.
 * @returns {Promise<import('@prisma/client').User>} The newly created user.
 * @throws {Error} If email already exists or password is too short.
 */
export async function register({ name, email, password }: { name: string; email: string; password: string }) {
  if (password.length < 8) {
    throw new Error("Password harus minimal 8 karakter.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existingUser) {
    throw new Error("Email sudah terdaftar.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: passwordHash,
      role: "user",
    },
  });

  return user;
}

/**
 * Authenticates a user and returns a JWT token.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} A JWT token.
 * @throws {Error} If credentials are invalid or user has no password.
 */
export async function login({ email, password }: { email: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new Error("Kredensial tidak valid.");
  }

  if (!user.password) {
    throw new Error("Akun ini tidak memiliki password. Silakan coba login dengan metode lain.");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Kredensial tidak valid.");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  return token;
}

/**
 * Initiates a password reset process by creating a token.
 * @param {string} email - The user's email address.
 * @returns {Promise<void>}
 * @throws {Error} If user not found (this error is caught and handled in the route action).
 */
export async function forgotPassword({ email }: { email: string }) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) {
    throw new Error("Pengguna dengan email tersebut tidak ditemukan.");
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600 * 1000);

  await prisma.passwordReset.create({
    data: { userId: user.id, token, expiresAt },
  });

  console.log(`Password reset token for ${user.email}: ${token}`);
}

/**
 * Resets a user's password using a valid token.
 * @param {string} token - The password reset token.
 * @param {string} newPassword - The new password.
 * @throws {Error} If token is invalid, expired, or new password is too short.
 */
export async function resetPassword({ token, newPassword }: { token: string; newPassword: string }) {
  if (newPassword.length < 8) {
    throw new Error("Password baru harus minimal 8 karakter.");
  }

  const resetEntry = await prisma.passwordReset.findFirst({ where: { token, expiresAt: { gt: new Date() } } });
  if (!resetEntry) {
    throw new Error("Token reset password tidak valid atau sudah kadaluarsa.");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: resetEntry.userId },
    data: { password: passwordHash },
  });

  await prisma.passwordReset.delete({ where: { id: resetEntry.id } });
}