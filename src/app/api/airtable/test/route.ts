import { NextResponse } from 'next/server';
import Airtable from 'airtable';

interface TableTestResult {
  name: string;
  exists: boolean;
  recordCount?: number;
  fields?: string[];
  error?: string;
  message?: string;
}

interface TestResults {
  success: boolean;
  baseId: string;
  testedTables: TableTestResult[];
  workingTable: string | null;
  sampleRecords: Array<{
    id: string;
    fields: Record<string, unknown>;
  }>;
}

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  
  if (!apiKey || !baseId) {
    return NextResponse.json({ 
      error: 'Missing API credentials',
      hasApiKey: !!apiKey,
      hasBaseId: !!baseId
    }, { status: 400 });
  }

  try {
    const airtable = new Airtable({ apiKey });
    const base = airtable.base(baseId);
    
    // 嘗試不同的表格名稱
    const possibleTableNames = [
      'Social Content List for blog',
      'Social Content List',
      'Complete Social Content List',
      'Blog Posts',
      'Posts',
      'Content'
    ];
    
    const results: TestResults = {
      success: true,
      baseId,
      testedTables: [],
      workingTable: null,
      sampleRecords: []
    };
    
    for (const tableName of possibleTableNames) {
      try {
        console.log(`Testing table: ${tableName}`);
        const table = base(tableName);
        const result = await table.select({ maxRecords: 1 }).all();
        
        results.testedTables.push({
          name: tableName,
          exists: true,
          recordCount: result.length,
          fields: result.length > 0 ? Object.keys(result[0].fields) : []
        });
        
        if (result.length > 0 && !results.workingTable) {
          results.workingTable = tableName;
          results.sampleRecords = result.map(record => ({
            id: record.id,
            fields: record.fields
          }));
        }
        
      } catch (tableError: unknown) {
        console.error(`Table ${tableName} error:`, tableError);
        const error = tableError as { error?: string; message?: string };
        results.testedTables.push({
          name: tableName,
          exists: false,
          error: error.error,
          message: error.message
        });
      }
    }
    
    return NextResponse.json(results);
    
  } catch (error: unknown) {
    console.error('Airtable test error:', error);
    const err = error as { message?: string; error?: string; statusCode?: number };
    return NextResponse.json({
      error: err.message,
      errorType: err.error,
      statusCode: err.statusCode
    }, { status: 500 });
  }
} 