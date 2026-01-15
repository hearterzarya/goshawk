import { NextResponse } from 'next/server'
import { carrierFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = carrierFormSchema.parse(body)

    // TODO: Connect to CRM/email service
    console.log('Carrier application received:', validatedData)

    return NextResponse.json(
      { message: 'Carrier application submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Carrier application error:', error)
    return NextResponse.json(
      { message: 'Failed to submit carrier application' },
      { status: 500 }
    )
  }
}
