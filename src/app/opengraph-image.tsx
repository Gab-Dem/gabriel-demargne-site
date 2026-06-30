import { ImageResponse } from "next/og";

export const alt = "Gabriel Demargne creative consulting website preview";
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
          justifyContent: "space-between",
          background: "#f6f1e8",
          color: "#111111",
          padding: "42px",
          border: "2px solid #111111",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 24,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <div>Gabriel Demargne</div>
          <div>Creative Consulting</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 86,
              lineHeight: 0.94,
              fontWeight: 700,
            }}
          >
            Website Design, UX/UI, Research, Strategy, and Photography.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.3,
              maxWidth: "760px",
            }}
          >
            Independent practice for artists, creative businesses, and
            service-led websites.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <span>Services</span>
            <span>Photography</span>
            <span>Contact</span>
          </div>
          <div>gabrieldemargne.com</div>
        </div>
      </div>
    ),
    size,
  );
}
