import { NextResponse } from 'next/server';

export async function POST(request) {
  const { full_name, dob, data } = await request.json();

  const user_id = `${full_name.trim().toLowerCase().replace(/\s+/g, '_')}_${dob}`;

  if (!Array.isArray(data)) {
    return NextResponse.json({ is_success: false, user_id });
  }

  const parsedInts = [];

  for (const item of data) {
    // Remove extra wrapping quotes if present
    const cleaned = String(item).trim().replace(/^"+|"+$/g, '');

    if (!/^-?\d+$/.test(cleaned)) {
      return NextResponse.json({ is_success: false, user_id });
    }

    parsedInts.push(parseInt(cleaned, 10));
  }

  const odd = parsedInts.filter((n) => n % 2 !== 0);
  const even = parsedInts.filter((n) => n % 2 === 0);

  return NextResponse.json({
    is_success: true,
    user_id,
    odd,
    even,
  });
}
