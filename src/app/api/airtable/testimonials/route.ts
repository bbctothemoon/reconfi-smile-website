import { NextResponse } from 'next/server';
import { getAirtableRecords } from '@/lib/airtable-client';

export async function GET() {
  try {
    // Airtable table 名稱要與你 Airtable 介面一致
    const records = await getAirtableRecords('Testimonials & Cases');
    return NextResponse.json(records);
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
} 