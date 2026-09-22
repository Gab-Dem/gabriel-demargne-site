import { ImageResponse } from "next/og";

export const alt =
  "Gabriel Demargne — Portfolio, Photography, Services, Contact";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#ffffff",
          color: "#000000",
          padding: "70px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 52,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-0.045em",
            }}
          >
            <span>Gabriel</span>
            <span>Demargne</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            <span>Portfolio</span>
            <span>Photography</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
