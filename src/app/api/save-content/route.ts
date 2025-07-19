import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 讀取現有內容
    const contentPath = join(process.cwd(), 'data', 'content.json');
    const existingContent = JSON.parse(readFileSync(contentPath, 'utf8'));
    
    // 更新內容
    const updatedContent = {
      ...existingContent,
      ...data
    };
    
    // 寫入文件
    writeFileSync(contentPath, JSON.stringify(updatedContent, null, 2), 'utf8');
    
    // 清除 Next.js 緩存
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/blog');
    
    return NextResponse.json({ 
      success: true, 
      message: '內容已成功保存並更新網站' 
    });
  } catch (error) {
    console.error('保存內容時發生錯誤:', error);
    const errorMessage = error instanceof Error ? error.message : '未知錯誤';
    return NextResponse.json(
      { success: false, message: '保存失敗: ' + errorMessage },
      { status: 500 }
    );
  }
} 