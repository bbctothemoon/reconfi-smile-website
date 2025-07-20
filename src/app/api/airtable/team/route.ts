import { NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/airtable';

export async function GET() {
  try {
    const teamMembers = await getTeamMembers();
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error in team API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
} 