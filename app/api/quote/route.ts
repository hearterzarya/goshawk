import { NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = quoteFormSchema.parse(body)

    // TODO: Connect to CRM/email service
    console.log('Quote request received:', validatedData)

    return NextResponse.json(
      { message: 'Quote request submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { message: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}
