import { NextResponse } from 'next/server';
import { getAirtableRecords } from '@/lib/airtable-client';

export async function GET() {
  try {
    const records = await getAirtableRecords('Blog');
    return NextResponse.json(records);
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
} 