// Simple authentication utility
// In production, use a proper auth solution like NextAuth.js

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123' // Change this!
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'

export interface AdminSession {
  username: string
  loggedIn: boolean
  expiresAt: number
}

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function createSession(username: string): AdminSession {
  return {
    username,
    loggedIn: true,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }
}

export function isSessionValid(session: AdminSession | null): boolean {
  if (!session) return false
  if (!session.loggedIn) return false
  if (Date.now() > session.expiresAt) return false
  return true
}
