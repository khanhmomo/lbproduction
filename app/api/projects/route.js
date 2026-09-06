import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '../../../lib/mongodb';

function toClient(p) {
  return {
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
  };
}

export async function GET() {
  try {
    const db = await getDb();
    const projects = await db
      .collection('projects')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(projects.map(toClient));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const db = await getDb();

    const doc = {
      title: body.title,
      category: body.category,
      client: body.client || '',
      excerpt: body.excerpt || '',
      description: body.description,
      imageUrl: body.imageUrl || body.images?.[0] || '',
      images: body.images || [],
      videos: body.videos || [],
      driveFolder: body.driveFolder || '',
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection('projects').insertOne(doc);
    return NextResponse.json(toClient({ ...doc, _id: result.insertedId }), {
      status: 201,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const body = await request.json();
    const db = await getDb();

    const update = {
      title: body.title,
      category: body.category,
      client: body.client || '',
      excerpt: body.excerpt || '',
      description: body.description,
      imageUrl: body.imageUrl || body.images?.[0] || '',
      images: body.images || [],
      videos: body.videos || [],
      driveFolder: body.driveFolder || '',
    };

    const result = await db
      .collection('projects')
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const doc = await db
      .collection('projects')
      .findOne({ _id: new ObjectId(id) });
    return NextResponse.json(toClient(doc));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db
      .collection('projects')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
