// app/api/blogs/route.ts
import { dbAdmin } from '@/lib/firebaseAdmin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const snapshot = await dbAdmin.collection('blogs').get()
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('ブログ一覧取得エラー:', error)
    return NextResponse.json({ error: '取得失敗' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 必須項目チェック（最小限）
    const { title, slug, content } = body
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'title, slug, content は必須です' },
        { status: 400 }
      )
    }

    const createdAt = new Date().toISOString()

    const blogData = {
      ...body,
      createdAt,
      views: 0,
    }

    const docRef = await dbAdmin.collection('blogs').add(blogData)

    return NextResponse.json({ id: docRef.id, ...blogData })
  } catch (error) {
    console.error('ブログ保存エラー:', error)
    return NextResponse.json({ error: '保存失敗' }, { status: 500 })
  }
}
