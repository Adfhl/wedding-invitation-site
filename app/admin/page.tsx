"use client";

import { useEffect, useMemo, useState } from "react";

type Guest = { id: number; name: string; phone: string; attendance: "yes" | "no"; companions: number; note: string; createdAt: string };

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  async function loadGuests(value = pin) {
    setLoading(true); setError("");
    const response = await fetch(`/api/rsvp?pin=${encodeURIComponent(value)}`, { cache: "no-store" });
    if (!response.ok) { setError("الرمز غير صحيح"); setLoading(false); return; }
    const data = await response.json() as { guests: Guest[] };
    setGuests(data.guests); setUnlocked(true); setLoading(false);
    sessionStorage.setItem("invitation-admin-pin", value);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("invitation-admin-pin");
    if (saved) { setPin(saved); loadGuests(saved); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const accepted = guests.filter((g) => g.attendance === "yes");
    return {
      accepted: accepted.length,
      declined: guests.filter((g) => g.attendance === "no").length,
      totalPeople: accepted.reduce((sum, guest) => sum + 1 + guest.companions, 0),
    };
  }, [guests]);

  if (!unlocked) return (
    <main className="admin-login" dir="rtl">
      <form onSubmit={(event) => { event.preventDefault(); loadGuests(); }}>
        <img src="/faisal-ebtisam-monogram.png" alt="فيصل وابتسام" />
        <span>لوحة الحضور</span><h1>فيصل وابتسام</h1><p>أدخل رمز الإدارة لمشاهدة الردود.</p>
        <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="رمز الإدارة" aria-label="رمز الإدارة" />
        {error && <small>{error}</small>}
        <button disabled={loading}>{loading ? "جاري الدخول…" : "دخول"}</button>
      </form>
    </main>
  );

  return (
    <main className="attendance-dashboard" dir="rtl">
      <header><div><span>دعوة عقد قران</span><h1>لوحة الحضور</h1><p>متابعة ردود ضيوف فيصل وابتسام</p></div><button onClick={() => loadGuests()}>تحديث البيانات</button></header>
      <section className="attendance-stats">
        <article className="primary"><span>إجمالي الحضور المتوقع</span><strong>{stats.totalPeople}</strong><small>شخصًا مع المرافقين</small></article>
        <article><span>أكدوا الحضور</span><strong>{stats.accepted}</strong><small>رد مؤكد</small></article>
        <article><span>اعتذروا</span><strong>{stats.declined}</strong><small>رد اعتذار</small></article>
        <article><span>إجمالي الردود</span><strong>{guests.length}</strong><small>رد مسجل</small></article>
      </section>
      <section className="guest-list">
        <div className="guest-list-heading"><div><span>قائمة الضيوف</span><h2>جميع الردود</h2></div><b>{guests.length} ضيفًا</b></div>
        {guests.length === 0 ? <div className="empty-guests">لا توجد ردود حتى الآن.</div> : (
          <div className="guest-table-wrap"><table><thead><tr><th>الضيف</th><th>الحالة</th><th>المرافقون</th><th>الجوال</th><th>الملاحظة</th><th>وقت الرد</th></tr></thead><tbody>{guests.map((guest) => <tr key={guest.id}><td><strong>{guest.name}</strong></td><td><span className={`attendance-badge ${guest.attendance}`}>{guest.attendance === "yes" ? "مؤكد" : "معتذر"}</span></td><td>{guest.attendance === "yes" ? guest.companions : "—"}</td><td dir="ltr">{guest.phone || "—"}</td><td>{guest.note || "—"}</td><td>{new Date(`${guest.createdAt}Z`).toLocaleString("ar-SA", { dateStyle: "medium", timeStyle: "short" })}</td></tr>)}</tbody></table></div>
        )}
      </section>
    </main>
  );
}
