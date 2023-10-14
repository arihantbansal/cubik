/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import Image from "next/image";
import { NextRequest } from "next/server";

export const runtime = "edge";

const font = fetch(
  new URL("../../../../assets/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const descriptionsize = true;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          backgroundImage:
            "url(https://res.cloudinary.com/demonicirfan/image/upload/v1687277874/Projects_ioajgm.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          fontWeight: "black",
          fontFamily: "Inter",
          padding: "4%",
        }}
      >
        <div
          style={{
            left: "2%",
            display: "flex",
            width: "8rem",
          }}
        >
          <img
            src="https://res.cloudinary.com/demonicirfan/image/upload/v1688300406/logo_lrij1t.png"
            alt="logo"
          />
        </div>
        <div
          style={{
            width: "8rem",
            height: "8rem",
            color: "#FFFFFF",
            position: "absolute",
            bottom: descriptionsize ? "50%" : "44%",
            left: "6.2%",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
          }}
        >
          <img
            // style={{ borderRadius: '0.8rem', border: '2px solid #FFFFFF7A' }}
            src="https://res.cloudinary.com/demonicirfan/image/upload/v1687169182/vckp0atyxrtrgw37kiup.jpg"
            alt="dasf"
          />
        </div>
        <div
          style={{
            width: "80%",
            color: "#FFFFFF",
            position: "absolute",
            bottom: descriptionsize ? "32%" : "25%",
            left: "6.2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "0.7rem",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "3.3rem",
              fontWeight: 800,
            }}
          >
            Session Keys
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.2rem",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                color: "#FFFFFF",
                fontSize: "2rem",
              }}
            >
              by
            </div>
            <div
              style={{
                color: "#A8F0E6",
                fontSize: "2rem",
              }}
            >
              @paarug
            </div>
          </div>
        </div>
        <div
          style={{
            width: "90%",
            color: "#FFFFFF",
            position: "absolute",
            bottom: "17%",
            left: "6.2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "0.7rem",
            fontSize: "1.5rem",
          }}
        >
          wallet & dApps improve their payment experience wallet & dApps improve
          wallet & dApps improve their payment experience wallet & dApps improve
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: await font,
          weight: 400,
        },
      ],
    }
  );
}
