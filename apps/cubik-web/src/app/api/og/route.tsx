/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const nameBase64 = req.nextUrl.searchParams.get('name');
  const nameBuffer = Buffer.from(nameBase64 as string, 'base64');
  const name = nameBuffer.toString();

  const taglineBase64 = req.nextUrl.searchParams.get('tagline');
  const taglineBuffer = Buffer.from(taglineBase64 as string, 'base64');
  const tagline = taglineBuffer.toString();

  const logoBase64 = req.nextUrl.searchParams.get('logo');
  const logoBuffer = Buffer.from(logoBase64 as string, 'base64');
  const logo = logoBuffer.toString();

  const contributors =
    parseInt(req.nextUrl.searchParams.get('contributors') ?? '0') ?? 10;
  const comments =
    parseInt(req.nextUrl.searchParams.get('comments') ?? '0') ?? 10;
  const participatingGrantsRound =
    req.nextUrl.searchParams.get('eventName') ?? undefined;

  const interRegular = await fetch(
    new URL('./Inter-Regular.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const interMedium = await fetch(
    new URL('./Inter-Medium.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const interSemiBold = await fetch(
    new URL('./Inter-SemiBold.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const interBold = await fetch(
    new URL('./Inter-Bold.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontFamily: 'Inter',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '480px',
            display: 'flex',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px 140px',
          }}
        >
          <div
            style={{
              margin: 'auto',
              width: '100%',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            {/*cubik logo*/}
            <div
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 140,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
              >
                <img
                  src={
                    'https://res.cloudinary.com/demonicirfan/image/upload/v1693936199/logo_demkfz.png'
                  }
                  alt={'og icon'}
                />
              </div>
            </div>
            {/*project info*/}
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: '48px',
              }}
            >
              <div
                style={{
                  color: '#000',
                  width: '600px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/*project name*/}
                <p
                  style={{
                    fontSize: '58px',
                    fontWeight: 700,
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {name}
                </p>
                {/*project tagline*/}
                <p
                  style={{
                    fontSize: '28px',
                    color: '#515251',
                    fontWeight: 500,
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {tagline}
                </p>
                {/*project stats*/}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '12px',
                    gap: '20px',
                  }}
                >
                  <div
                    style={{
                      display: contributors === 0 ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '14px',
                    }}
                  >
                    <svg
                      width="26"
                      height="28"
                      viewBox="0 0 26 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.417 4.58175C19.7122 5.35125 20.5837 6.78952 20.5837 8.43682C20.5837 10.0841 19.7122 11.5224 18.417 12.2919M22.7503 23.7157C23.3979 23.3309 23.8337 22.6118 23.8337 21.7882C23.8337 20.1409 22.9622 18.7026 21.667 17.9331M15.167 8.43678C15.167 10.8947 13.2269 12.8872 10.8337 12.8872C8.44043 12.8872 6.50033 10.8947 6.50033 8.43678C6.50033 5.97886 8.44043 3.98633 10.8337 3.98633C13.2269 3.98633 15.167 5.97886 15.167 8.43678ZM6.50033 17.3377H15.167C17.5602 17.3377 19.5003 19.3302 19.5003 21.7881C19.5003 23.0171 18.5303 24.0134 17.3337 24.0134H4.33366C3.13704 24.0134 2.16699 23.0171 2.16699 21.7881C2.16699 19.3302 4.10709 17.3377 6.50033 17.3377Z"
                        stroke="#8C8D8C"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      style={{
                        fontSize: '22px',
                        color: '#8C8D8C',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {contributors}
                    </p>
                  </div>
                  <div
                    style={{
                      display:
                        comments === 0 || contributors === 0 ? 'none' : 'flex',
                      background: '#8C8D8C',
                      width: '4px',
                      height: '4px',
                      borderRadius: '100%',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <svg
                      width="26"
                      height="28"
                      viewBox="0 0 26 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.66667 11.7851H17.3333M8.66667 16.2147H13M22.75 13.9999C22.75 19.5043 18.3848 23.9665 13 23.9665C12.5323 23.9665 12.0724 23.9329 11.6223 23.8678C10.3183 23.6793 9.66629 23.585 9.49464 23.5715C9.21581 23.5495 9.31579 23.553 9.03614 23.5553C8.86402 23.5566 8.66781 23.571 8.27591 23.5996L5.94314 23.7699C5.01427 23.8377 4.5498 23.8716 4.20248 23.7033C3.89759 23.5555 3.65206 23.3046 3.50751 22.9929C3.34284 22.6378 3.37602 22.1631 3.44237 21.2135L3.60899 18.8289C3.637 18.4282 3.651 18.2278 3.65234 18.0518C3.65451 17.7659 3.65797 17.8681 3.63647 17.5831C3.62323 17.4077 3.53101 16.7412 3.34658 15.4082C3.28292 14.9481 3.25 14.4779 3.25 13.9999C3.25 8.49543 7.61522 4.0332 13 4.0332C18.3848 4.0332 22.75 8.49543 22.75 13.9999Z"
                        stroke="#8C8D8C"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      style={{
                        fontSize: '22px',
                        color: '#8C8D8C',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {comments}
                    </p>
                  </div>
                </div>
              </div>
              {/*project logo*/}
              <div
                style={{
                  width: '280px',
                  height: '280px',
                  overflow: 'hidden',
                  borderRadius: '1000px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  objectFit: 'fill',
                  objectPosition: 'center',
                }}
              >
                <img
                  style={{
                    borderRadius: '1000px',
                    width: '280px',
                    height: '280px',
                    maxHeight: '280px',
                    maxWidth: '280px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  src={logo as string}
                  alt="project logo"
                />
              </div>
            </div>
          </div>
        </div>
        {/*image footer*/}
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#DCDCDC40',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px 140px',
          }}
        >
          {/* Blurred Background */}
          <div
            style={{
              width: '100%',
              height: '125px',
              position: 'absolute', // Absolute positioning
              //  zIndex: 1, // Keep it below the content
              filter: 'blur(60px)',
              WebkitFilter: 'blur(60px)',
              backgroundImage: `url(${logo})`,
              backgroundSize: '60%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '20% 60%',
            }}
          />
          <div
            style={{
              width: '100%',
              height: '125px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '12px',
            }}
          >
            {participatingGrantsRound ? (
              <>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14"
                    cy="14"
                    r="14"
                    fill="black"
                    fillOpacity="0.2"
                  />
                  <circle
                    cx="14"
                    cy="14"
                    r="8"
                    fill="black"
                    fillOpacity="0.4"
                  />
                  <circle cx="14" cy="14" r="4" fill="black" />
                  <circle cx="14" cy="14" r="4" fill="black" />
                </svg>
                <p
                  style={{
                    fontSize: '16px',
                    letterSpacing: '1.6px',
                    textTransform: 'uppercase',
                    color: '#000',
                    fontWeight: 600,
                    marginTop: 6,
                    marginLeft: 4,
                  }}
                >
                  Participating in {participatingGrantsRound}
                </p>
              </>
            ) : (
              <p
                style={{
                  fontSize: '16px',
                  letterSpacing: '1.6px',
                  textTransform: 'uppercase',
                  color: '#000',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Checkout {name} on Cubik
              </p>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 627,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
        },
        {
          name: 'Inter',
          data: interMedium,
          weight: 500,
        },
        {
          name: 'Inter',
          data: interSemiBold,
          weight: 600,
        },
        {
          name: 'Inter',
          data: interBold,
          weight: 700,
        },
      ],
    },
  );
}
