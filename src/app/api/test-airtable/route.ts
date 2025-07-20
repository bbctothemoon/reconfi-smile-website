import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    // 初始化 Airtable 客戶端
    const airtable = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    });

    // 獲取基礎資料庫
    const base = airtable.base(process.env.AIRTABLE_BASE_ID || '');

    // 嘗試獲取第一個資料表的記錄來了解結構
    // 假設您的資料表名稱是 "Social Posts" 或類似名稱
    const possibleTableNames = ['Social Posts', 'Posts', 'Blog Posts', 'Content', 'Social Media'];
    
    let tableInfo = null;
    
    for (const tableName of possibleTableNames) {
      try {
        const records = await base(tableName).select({ maxRecords: 1 }).all();
        if (records.length > 0) {
          const record = records[0];
          const fields = Object.keys(record.fields).map(fieldName => ({
            name: fieldName,
            value: record.get(fieldName),
            type: typeof record.get(fieldName)
          }));
          
          tableInfo = {
            tableName,
            fields
          };
          break;
        }
      } catch (error) {
        // 繼續嘗試下一個資料表名稱
        continue;
      }
    }

    if (!tableInfo) {
      return NextResponse.json({
        success: false,
        error: 'No suitable table found. Please check your table names.',
        message: '請確認您的 Airtable 資料表名稱，或手動提供欄位結構。'
      });
    }

    return NextResponse.json({
      success: true,
      tableInfo
    });
  } catch (error) {
    console.error('Error fetching Airtable structure:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch Airtable structure',
        details: error instanceof Error ? error.message : 'Unknown error',
        message: '請確認您的 AIRTABLE_API_KEY 和 AIRTABLE_BASE_ID 是否正確設定。'
      },
      { status: 500 }
    );
  }
} 