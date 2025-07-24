import { NextResponse } from 'next/server';
import { getAirtableRecords } from '@/lib/airtable-client';

export async function GET() {
  try {
    const records = await getAirtableRecords('Blog');
    return NextResponse.json(records);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 