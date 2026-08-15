"use client";

import { FormEvent, useState } from "react";

type Attendance = "yes" | "no" | "";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [attendance, setAttendance] = useState<Attendance>("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companions, setCompanions] = useState(0);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function chooseAttendance(value: Exclude<Attendance, "">) {
    setAttendance(value);
    setShowForm(true);
    setError("");
  }

  async function submitAttendance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !attendance) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, phone, attendance, companions, note }),
      });
      if (!response.ok) throw new Error("تعذر حفظ الرد");
      setShowForm(false);
    } catch {
      setError("تعذر حفظ الرد الآن، فضلاً جرّب مرة أخرى.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="invitation-page" dir="rtl">
      <section className={`invitation-experience ${opened ? "is-open" : ""}`} aria-label="دعوة حفل ملكة فيصل وابتسام">
        <article className="inside-card" aria-hidden={!opened}>
          <div className="inside-frame">
            <span className="inside-arch" aria-hidden="true" />
            <span className="inside-ornament ornament-top" aria-hidden="true">
              <img src="/invitation-ornament-top.png" alt="" />
            </span>
            <span className="inside-ornament ornament-bottom" aria-hidden="true">
              <img src="/invitation-ornament-bottom.png" alt="" />
            </span>
            <span className="inside-monogram" aria-label="شعار فيصل وابتسام">
              <img src="/faisal-ebtisam-monogram.png" alt="" />
            </span>
            <p className="inside-kicker">دعوة عقد قران</p>
            <p className="inside-blessing">بارك الله لهما وبارك عليهما<br />وجمع بينهما في خير</p>

            <h1 className="inside-names"><span>فيصل</span><i>و</i><span>ابتسام</span></h1>
            <p className="inside-copy">يسرّنا دعوتكم لمشاركتنا فرحة عقد قراننا</p>

            <div className="inside-details">
              <div><strong>الأحد</strong><span>12 ربيع الآخر 1449هـ</span></div>
              <div><strong>9:30 مساءً</strong><span>موعد الاستقبال</span></div>
              <div><strong>قاعة الأفراح</strong><span>أبها</span></div>
            </div>

            <div className="inside-divider" aria-hidden="true"><span>◆</span></div>

            <div className="inline-rsvp" aria-live="polite">
              {!attendance ? (
                <>
                  <p>هل ستشاركوننا الفرحة؟</p>
                  <div className="rsvp-actions">
                    <button className="accept" onClick={() => chooseAttendance("yes")}>
                      <b>أؤكد الحضور</b><span>بكل سرور</span>
                    </button>
                    <button className="decline" onClick={() => chooseAttendance("no")}>
                      <b>أعتذر عن الحضور</b><span>مع خالص الدعوات</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className={`response-message ${attendance}`} role="status">
                  <span>{attendance === "yes" ? "♥" : "—"}</span>
                  <strong>{attendance === "yes" ? "تم تأكيد حضوركم" : "وصلنا اعتذاركم"}</strong>
                  <p>{attendance === "yes" ? "بحضوركم تكتمل فرحتنا، ننتظركم بكل محبة." : "نقدّر اعتذاركم، ونسأل الله أن يجمعنا بكم على خير."}</p>
                  <button onClick={() => { setAttendance(""); setShowForm(false); }}>تعديل الرد</button>
                </div>
              )}
            </div>
          </div>
        </article>

        <button
          className="fabric-cover"
          type="button"
          onClick={() => setOpened(true)}
          aria-label="فتح دعوة فيصل وابتسام"
          disabled={opened}
        >
          <span className="fabric-door fabric-door-right"><i /></span>
          <span className="fabric-door fabric-door-left"><i /></span>
          <span className="fabric-clasp" aria-hidden="true">
            <img src="/faisal-ibtisam-seal.png" alt="" />
          </span>
          <span className="fabric-title">فيصل وابتسام</span>
          <span className="fabric-hint">اضغط لفتح الدعوة</span>
        </button>
      </section>

      {showForm && (
        <div className="rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="rsvp-title">
          <form className="rsvp-dialog" onSubmit={submitAttendance}>
            <button className="rsvp-close" type="button" onClick={() => { setShowForm(false); setAttendance(""); }} aria-label="إغلاق">×</button>
            <span className="rsvp-heart" aria-hidden="true">{attendance === "yes" ? "♥" : "—"}</span>
            <h2 id="rsvp-title">{attendance === "yes" ? "تأكيد الحضور" : "الاعتذار عن الحضور"}</h2>
            <p>{attendance === "yes" ? "اكتب اسمك حتى نسجّل حضورك في قائمة الضيوف." : "اكتب اسمك حتى يصلنا اعتذارك بكل ود."}</p>

            <label><span>الاسم الكامل</span><input value={name} onChange={(e) => setName(e.target.value)} required placeholder="مثال: عبدالله عسيري" autoFocus /></label>
            <label><span>رقم الجوال <small>اختياري</small></span><input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="05xxxxxxxx" /></label>
            {attendance === "yes" && (
              <label><span>عدد المرافقين</span><select value={companions} onChange={(e) => setCompanions(Number(e.target.value))}>{[0,1,2,3,4,5].map((count) => <option key={count} value={count}>{count === 0 ? "بدون مرافقين" : count}</option>)}</select></label>
            )}
            <label><span>ملاحظة <small>اختياري</small></span><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="اكتب ملاحظتك هنا" /></label>
            {error && <p className="rsvp-error" role="alert">{error}</p>}
            <button className="rsvp-save" type="submit" disabled={saving}>{saving ? "جاري الحفظ…" : "إرسال الرد"}</button>
          </form>
        </div>
      )}
    </main>
  );
}
