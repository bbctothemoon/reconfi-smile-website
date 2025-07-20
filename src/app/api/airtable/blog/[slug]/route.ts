import { NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/airtable';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: BlogPostParams) {
  try {
    const post = await getBlogPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in blog post API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 