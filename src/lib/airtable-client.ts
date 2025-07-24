import fetch from 'node-fetch';

const AIRTABLE_API_URL = 'https://api.airtable.com/v0';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || '';

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error('請設定 AIRTABLE_API_KEY 及 AIRTABLE_BASE_ID 環境變數');
}

async function airtableRequest(table: string, method = 'GET', body?: any, recordId?: string) {
  let url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;
  if (recordId) url += `/${recordId}`;
  const options: any = {
    method,
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Airtable API error: ${res.status} ${res.statusText}`);
  return await res.json();
}

export async function getAirtableRecords(table: string) {
  const data = await airtableRequest(table, 'GET');
  return (data as { records: unknown[] }).records;
}

export async function createAirtableRecord(table: string, fields: any) {
  return await airtableRequest(table, 'POST', { fields });
}

export async function updateAirtableRecord(table: string, recordId: string, fields: any) {
  return await airtableRequest(table, 'PATCH', { fields }, recordId);
}

export async function deleteAirtableRecord(table: string, recordId: string) {
  return await airtableRequest(table, 'DELETE', undefined, recordId);
} 