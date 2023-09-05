/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          fontWeight: "black",
          fontFamily: "Inter",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20%",
          display: "flex",
          backgroundColor: "#161616",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "8rem",
              height: "8rem",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
            }}
          >
            <img
              style={{ borderRadius: "1rem" }}
              src="https://res.cloudinary.com/demonicirfan/image/upload/v1687169182/vckp0atyxrtrgw37kiup.jpg"
              alt="dasf"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <div
              style={{
                width: "80%",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0.7rem",
              }}
            >
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "3rem",
                  fontWeight: 800,
                }}
              >
                Session Keys
              </div>
            </div>
            <div
              style={{
                width: "90%",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "1.2rem",
              }}
            >
              wallet & dApps improve their payment experience wallet & dApps
              improve wallet & dApps improve their payment experience
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "0.7rem",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "flex-end",
              margin: 5,
            }}
          >
            <img
              src={
                "https://res.cloudinary.com/do7tp4u57/image/upload/v1693888855/tqwgszhldvttitkph48a.svg"
              }
              alt={"og icon"}
            />
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "2.2rem",
              letterSpacing: "0.1rem",
              fontWeight: 700,
              display: "flex",
            }}
          >
            LIVE ON CUBIK
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      // fonts: [
      //   {
      //     name: "Inter",
      //     // data: await font,
      //     data: [],
      //     weight: 400,
      //   },
      // ],
    }
  );
}
