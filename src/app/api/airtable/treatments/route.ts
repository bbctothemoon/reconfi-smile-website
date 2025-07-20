import { NextResponse } from 'next/server';
import { getTreatments } from '@/lib/airtable';

export async function GET() {
  try {
    const treatments = await getTreatments();
    return NextResponse.json(treatments);
  } catch (error) {
    console.error('Error in treatments API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treatments' },
      { status: 500 }
    );
  }
} 