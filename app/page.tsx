"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Attendance = "yes" | "no";
const EVENT_DATE = new Date("2027-08-15T21:30:00+03:00");

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => {
    const difference = Math.max(0, EVENT_DATE.getTime() - now);
    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [now]);
}

export default function Home() {
  const countdown = useCountdown();
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [attendance, setAttendance] = useState<Attendance>("yes");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState<Attendance | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companions, setCompanions] = useState(0);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => finishOpening(), 8000);
    return () => {
      window.clearTimeout(fallbackTimer);
      document.body.classList.remove("invitation-opened");
    };
  }, []);

  function finishOpening() {
    if (opening || opened) return;
    setOpening(true);
    window.setTimeout(() => {
      setOpened(true);
      document.body.classList.add("invitation-opened");
    }, 850);
  }

  function chooseAttendance(value: Attendance) {
    setAttendance(value);
    setShowForm(true);
    setError("");
  }

  async function submitAttendance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, phone, attendance, companions, note }),
      });
      if (!response.ok) throw new Error();
      setSubmitted(attendance);
      setShowForm(false);
    } catch {
      setError("تعذر حفظ الرد الآن، فضلاً جرّب مرة أخرى.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={`wedding-site ${opened ? "is-revealed" : ""}`} dir="rtl">
      {!opened && (
        <section className={`opening-screen ${opening ? "is-opening" : ""}`} aria-label="افتتاح دعوة فيصل وابتسام">
          <div className="opening-glow" />
          <div className="envelope-gif-button" aria-hidden="true">
            <video src="/envelope-opening.mp4" autoPlay muted playsInline preload="auto" onEnded={finishOpening} />
          </div>
        </section>
      )}

      <div className="invitation-journey" aria-hidden={!opened}>
        <section className="invitation-hero section-shell">
          <img className="floral-edge floral-edge-right" src="/floral-crescent-right.png" alt="" />
          <img className="floral-edge floral-edge-left" src="/floral-crescent-left.png" alt="" />
          <img className="hero-flower hero-flower-top" src="/floral-bouquet.png" alt="" />
          <img className="hero-flower hero-flower-bottom" src="/floral-babys-breath.png" alt="" />
          <div className="invitation-card-new">
            <img className="hero-invitation-flower" src="/floral-single.png" alt="" />
            <p className="hero-invitation-label">دعوة عقد قران</p>
            <p className="hero-blessing">بارك الله لهما وبارك عليهما<br />وجمع بينهما في خير</p>
            <p className="hero-message">يسعدنا ويشرّفنا دعوتكم بكل الحب لحضور حفل عقد قران</p>
            <h1><span>فيصل</span><i>و</i><span>ابتسام</span></h1>
            <p className="hero-wish">الأيام الجميلة لا تكتمل إلا بكم<br />والأوقات السعيدة تبدأ معكم</p>
            <div className="hero-rule"><span>◆</span></div>
          </div>
        </section>

        <section id="countdown" className="countdown-section section-shell">
          <div className="section-heading-new"><span>نلتقي على فرح</span><h2>باقي على لقائنا</h2><p>نعدّ الأيام حتى تكتمل فرحتنا بحضوركم.</p></div>
          <div className="countdown-grid" aria-label="العد التنازلي">
            {[
              [countdown.days, "يوم"], [countdown.hours, "ساعة"], [countdown.minutes, "دقيقة"], [countdown.seconds, "ثانية"],
            ].map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
          </div>
          <img className="countdown-ornament" src="/floral-single.png" alt="" />
        </section>

        <section className="event-section section-shell">
          <img className="event-floral event-floral-bouquet" src="/floral-bouquet.png" alt="" />
          <img className="event-floral event-floral-leaves" src="/floral-leaves.png" alt="" />
          <div className="section-heading-new"><span>تفاصيل المناسبة</span><h2>حياكم الله</h2><p>وجودكم بيننا هو أجمل تفاصيل هذه الليلة.</p></div>
          <div className="event-details-grid">
            <article><b>01</b><span>اليوم والتاريخ</span><strong>الأحد</strong><p>12 ربيع الآخر 1449هـ</p></article>
            <article><b>02</b><span>وقت الاستقبال</span><strong>9:30 مساءً</strong><p>يسعدنا استقبالكم</p></article>
            <article><b>03</b><span>مكان المناسبة</span><strong>قاعة الأفراح</strong><p>أبها</p></article>
          </div>
          <a className="map-button" href="https://maps.google.com" target="_blank" rel="noreferrer"><span>عرض الموقع على الخريطة</span><b>↗</b></a>
        </section>

        <section className="program-section section-shell">
          <img className="program-floral-feature" src="/floral-crescent-left.png" alt="" />
          <img className="program-ornament" src="/floral-babys-breath.png" alt="" />
          <div className="section-heading-new"><span>ترتيب أمسيتنا</span><h2>برنامج الحفل</h2><p>تفاصيل ليلةٍ ننتظرها بكل فرح.</p></div>
          <div className="program-timeline">
            <article><time>9:30</time><span>مساءً</span><div><b>01</b><h3>استقبال الضيوف</h3><p>نستقبلكم بكل محبة وترحيب.</p></div></article>
            <article><time>10:00</time><span>مساءً</span><div><b>02</b><h3>عقد القران</h3><p>لحظة البداية وفرحة اجتماعنا.</p></div></article>
            <article><time>10:30</time><span>مساءً</span><div><b>03</b><h3>الضيافة والتهاني</h3><p>وقت نشاركه معكم بالفرح والتهنئة.</p></div></article>
            <article><time>11:15</time><span>مساءً</span><div><b>04</b><h3>مأدبة العشاء</h3><p>نتشرّف بمشاركتكم ختام أمسيتنا.</p></div></article>
          </div>
          <img className="program-ornament program-ornament-bottom" src="/floral-single.png" alt="" />
        </section>

        <section className="attendance-section section-shell">
          <img className="attendance-ornament" src="/floral-bouquet.png" alt="" />
          <div className="section-heading-new"><span>تأكيد الحضور</span><h2>هل ستشاركوننا الفرحة؟</h2><p>نرجو تسجيل ردكم لمساعدتنا في ترتيب الاستقبال.</p></div>
          {!submitted ? <div className="attendance-actions-new"><button className="confirm" onClick={() => chooseAttendance("yes")}><strong>أؤكد الحضور</strong><span>بكل سرور</span></button><button onClick={() => chooseAttendance("no")}><strong>أعتذر عن الحضور</strong><span>مع خالص الدعوات</span></button></div> : <div className="submitted-message"><span>{submitted === "yes" ? "♥" : "—"}</span><h3>{submitted === "yes" ? "تم تأكيد حضوركم" : "وصلنا اعتذاركم"}</h3><p>{submitted === "yes" ? "بحضوركم تكتمل فرحتنا، ننتظركم بكل محبة." : "نقدّر اعتذاركم، ونسأل الله أن يجمعنا بكم على خير."}</p><button onClick={() => { setSubmitted(null); setShowForm(true); }}>تعديل الرد</button></div>}
        </section>
      </div>

      {showForm && <div className="rsvp-modal" role="dialog" aria-modal="true"><form className="rsvp-dialog" onSubmit={submitAttendance}><button className="rsvp-close" type="button" onClick={() => setShowForm(false)} aria-label="إغلاق">×</button><span className="rsvp-heart">{attendance === "yes" ? "♥" : "—"}</span><h2>{attendance === "yes" ? "تأكيد الحضور" : "الاعتذار عن الحضور"}</h2><p>{attendance === "yes" ? "اكتب اسمك حتى نسجّل حضورك في قائمة الضيوف." : "اكتب اسمك حتى يصلنا اعتذارك بكل ود."}</p><label><span>الاسم الكامل</span><input value={name} onChange={(e) => setName(e.target.value)} required placeholder="مثال: عبدالله عسيري" autoFocus /></label><label><span>رقم الجوال <small>اختياري</small></span><input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="05xxxxxxxx" /></label>{attendance === "yes" && <label><span>عدد المرافقين</span><select value={companions} onChange={(e) => setCompanions(Number(e.target.value))}>{[0,1,2,3,4,5].map((count) => <option key={count} value={count}>{count === 0 ? "بدون مرافقين" : count}</option>)}</select></label>}<label><span>ملاحظة <small>اختياري</small></span><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="اكتب ملاحظتك هنا" /></label>{error && <p className="rsvp-error">{error}</p>}<button className="rsvp-save" disabled={saving}>{saving ? "جاري الحفظ…" : "إرسال الرد"}</button></form></div>}
    </main>
  );
}
