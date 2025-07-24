export async function GET() {
  return new Response(
    JSON.stringify({
      AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    }),
    { status: 200 }
  );
}
