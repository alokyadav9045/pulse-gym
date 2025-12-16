import type { Twilio } from 'twilio'
import jwt from 'jsonwebtoken'

let client: Twilio | null = null

async function getClient() {
  if (client) return client
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN

  if (!sid || !token) return null

  // Dynamic import avoids requiring Twilio in environments without creds
  const twilioModule = await import('twilio')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const twilio = (twilioModule as any).default ?? twilioModule
  client = twilio(sid, token)
  return client
}

export async function sendWhatsApp(to: string, body: string) {
  const c = await getClient()
  const from = process.env.TWILIO_WHATSAPP_FROM

  if (!c || !from) {
    return { success: false, message: 'Twilio not configured' }
  }

  try {
    const message = await c.messages.create({
      from,
      to: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`,
      body
    })
    return { success: true, sid: message.sid }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : String(error) }
  }
}

export async function sendSMS(to: string, body: string) {
  const c = await getClient()
  const from = process.env.TWILIO_PHONE_NUMBER

  if (!c || !from) {
    return { success: false, message: 'Twilio SMS not configured' }
  }

  try {
    const message = await c.messages.create({ from, to, body })
    return { success: true, sid: message.sid }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : String(error) }
  }
}

export function createUnsubscribeToken(memberId: string) {
  const secret = process.env.JWT_SECRET
  if (!secret) return null
  return jwt.sign({ memberId, action: 'unsubscribe_whatsapp' }, secret, { expiresIn: '30d' })
}

export default { sendWhatsApp, sendSMS, createUnsubscribeToken }
