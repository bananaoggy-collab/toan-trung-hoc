import { sql } from "@vercel/postgres";

// Initialize tables
let isInitialized = false;
export async function initDb() {
  if (isInitialized) return;
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS Categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        category_id INTEGER REFERENCES Categories(id),
        excerpt TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES Posts(id),
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved INTEGER DEFAULT 0
      );
    `;

    await sql`INSERT INTO Categories (id, name, slug) VALUES (1, 'Math Stories', 'math-stories') ON CONFLICT (id) DO NOTHING;`;
    await sql`INSERT INTO Categories (id, name, slug) VALUES (2, 'Did You Know?', 'did-you-know') ON CONFLICT (id) DO NOTHING;`;
    await sql`INSERT INTO Categories (id, name, slug) VALUES (3, 'Theory', 'theory') ON CONFLICT (id) DO NOTHING;`;
    await sql`INSERT INTO Categories (id, name, slug) VALUES (4, 'Exercises', 'exercises') ON CONFLICT (id) DO NOTHING;`;
    await sql`INSERT INTO Categories (id, name, slug) VALUES (5, 'Exams', 'exams') ON CONFLICT (id) DO NOTHING;`;
    
    isInitialized = true;
  } catch (error) {
    if (!error.message.includes('Vercel Postgres required env vars')) {
      console.error("Database initialization failed:", error);
    }
  }
}

function isConfigured() {
  return !!process.env.POSTGRES_URL;
}

export async function getPosts() {
  if (!isConfigured()) return [];
  await initDb();
  const { rows } = await sql`
    SELECT p.*, c.name as category_name 
    FROM Posts p 
    LEFT JOIN Categories c ON p.category_id = c.id 
    ORDER BY p.created_at DESC
  `;
  return rows;
}

export async function getPostsByCategory(categorySlug) {
  if (!isConfigured()) return [];
  await initDb();
  const { rows } = await sql`
    SELECT p.*, c.name as category_name 
    FROM Posts p 
    JOIN Categories c ON p.category_id = c.id 
    WHERE c.slug = ${categorySlug} 
    ORDER BY p.created_at DESC
  `;
  return rows;
}

export async function getPostBySlug(slug) {
  if (!isConfigured()) return null;
  await initDb();
  const { rows } = await sql`
    SELECT p.*, c.name as category_name 
    FROM Posts p 
    LEFT JOIN Categories c ON p.category_id = c.id 
    WHERE p.slug = ${slug}
  `;
  return rows[0] || null;
}

export async function createPost({ title, slug, content, category_id, excerpt }) {
  if (!isConfigured()) return null;
  await initDb();
  const { rows } = await sql`
    INSERT INTO Posts (title, slug, content, category_id, excerpt) 
    VALUES (${title}, ${slug}, ${content}, ${category_id}, ${excerpt})
    RETURNING *;
  `;
  return rows[0];
}

export async function deletePost(id) {
  if (!isConfigured()) return;
  await initDb();
  await sql`DELETE FROM Posts WHERE id = ${id}`;
}

export async function getCategories() {
  if (!isConfigured()) return [
    { id: 1, name: 'Math Stories', slug: 'math-stories' },
    { id: 2, name: 'Did You Know?', slug: 'did-you-know' },
    { id: 3, name: 'Theory', slug: 'theory' },
    { id: 4, name: 'Exercises', slug: 'exercises' },
    { id: 5, name: 'Exams', slug: 'exams' }
  ];
  await initDb();
  const { rows } = await sql`SELECT * FROM Categories`;
  return rows;
}

export async function getComments(postId) {
  if (!isConfigured()) return [];
  await initDb();
  const { rows } = await sql`
    SELECT * FROM Comments 
    WHERE post_id = ${postId} 
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function createComment({ post_id, author, content }) {
  if (!isConfigured()) return { id: Date.now(), post_id, author, content };
  await initDb();
  const { rows } = await sql`
    INSERT INTO Comments (post_id, author, content) 
    VALUES (${post_id}, ${author}, ${content})
    RETURNING *;
  `;
  return rows[0];
}
