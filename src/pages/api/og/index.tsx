import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
export const config = {
  runtime: 'edge',
};

const font = fetch(
  new URL('../../../../assets/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          backgroundImage:
            'url(https://res.cloudinary.com/demonicirfan/image/upload/v1687277874/Projects_ioajgm.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          fontWeight: 'black',
          fontFamily: 'Inter',
          padding: '4%',
        }}
      ></div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Inter',
          data: await font,
          weight: 400,
        },
      ],
    }
  );
}
