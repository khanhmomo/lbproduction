import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '../../../../lib/mongodb';

export async function GET(request, { params }) {
  try {
    const db = await getDb();
    const p = await db
      .collection('projects')
      .findOne({ _id: new ObjectId(params.id) });

    if (!p) {
      return NextResponse.json({ error: 'Không tìm thấy dự án' }, { status: 404 });
    }

    return NextResponse.json({
      id: p._id.toString(),
      title: p.title,
      category: p.category,
      client: p.client,
      excerpt: p.excerpt || '',
      description: p.description,
      imageUrl: p.imageUrl,
      images: p.images || [],
      videos: p.videos || [],
      driveFolder: p.driveFolder,
      createdAt: p.createdAt,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
