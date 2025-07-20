import { NextResponse } from 'next/server';
import { getBlogPost } from '@/lib/content';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = getBlogPost(slug);
    
    if (!post) {
      return NextResponse.json({ error: '文章未找到' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: '服務器錯誤' }, { status: 500 });
  }
} 