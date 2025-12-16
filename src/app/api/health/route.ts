import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'

export async function GET() {
  try {
    // Try to connect to DB (non-fatal if missing in non-prod)
    try {
      await dbConnect()
    } catch (e) {
      // If DB can't connect, report it but still return 200 so uptime checks are visible
      return NextResponse.json({ success: true, db: 'error', message: (e as Error).message })
    }

    return NextResponse.json({ success: true, status: 'ok' })
  } catch {
    return NextResponse.json({ success: false, message: 'Health check failed' }, { status: 500 })
  }
}
