import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "دعوة حفل ملكة فيصل وابتسام";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const monogram = await readFile(
    join(process.cwd(), "public", "faisal-ebtisam-monogram.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#23262c",
          overflow: "hidden",
        }}
      >
        <img
          src={`data:image/png;base64,${monogram.toString("base64")}`}
          alt=""
          style={{ width: 760, height: 304, objectFit: "contain" }}
        />
      </div>
    ),
    size,
  );
}
