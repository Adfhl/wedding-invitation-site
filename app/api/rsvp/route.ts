import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { guests } from "../../../db/schema";

const ADMIN_PIN = "1449";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    name?: string;
    phone?: string;
    attendance?: "yes" | "no";
    companions?: number;
    note?: string;
  };
  const name = payload.name?.trim() ?? "";
  if (!name || !["yes", "no"].includes(payload.attendance ?? "")) {
    return Response.json({ error: "بيانات الرد غير مكتملة" }, { status: 400 });
  }
  const [guest] = await getDb().insert(guests).values({
    name: name.slice(0, 100),
    phone: payload.phone?.trim().slice(0, 30) ?? "",
    attendance: payload.attendance!,
    companions: payload.attendance === "yes" ? Math.max(0, Math.min(5, Number(payload.companions) || 0)) : 0,
    note: payload.note?.trim().slice(0, 300) ?? "",
  }).returning();
  return Response.json({ guest }, { status: 201 });
}

export async function GET(request: Request) {
  const pin = new URL(request.url).searchParams.get("pin");
  if (pin !== ADMIN_PIN) return Response.json({ error: "غير مصرح" }, { status: 401 });
  const rows = await getDb().select().from(guests).orderBy(desc(guests.createdAt), desc(guests.id));
  return Response.json({ guests: rows });
}
