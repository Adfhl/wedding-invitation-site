"use client";

import { FormEvent, useRef, useState } from "react";

type Attendance = "yes" | "no" | "";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [attendance, setAttendance] = useState<Attendance>("");
  const [submitted, setSubmitted] = useState(false);
  const rsvpRef = useRef<HTMLElement>(null);

  function openInvitation() {
    setOpened(true);
  }

  function goToRsvp() {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!attendance) return;
    setSubmitted(true);
  }

  return (
    <main dir="rtl">
      <section className={`hero ${opened ? "is-open" : ""}`} aria-label="دعوة حفل ملكة فيصل وابتسام">
        <div className="botanical botanical-one" aria-hidden="true" />
        <div className="botanical botanical-two" aria-hidden="true" />

        <header className="intro">
          <span className="eyebrow">بكل الحب ندعوكم</span>
          <h1>فيصل <i>&amp;</i> ابتسام</h1>
          <p>{opened ? "تشرفنا مشاركتكم فرحتنا" : "اضغط على الختم لفتح الدعوة"}</p>
        </header>

        <div className="invitation-stage">
          <div className="envelope-shadow" aria-hidden="true" />

          <article className="invitation-card" aria-hidden={!opened}>
            <div className="card-border">
              <div className="formal-heading">
                <span>دعوة حفل ملكة</span>
                <i aria-hidden="true">◆</i>
              </div>
              <p className="blessing">بارك الله لهما وبارك عليهما<br />وجمع بينهما في خير</p>
              <div className="couple-names" aria-label="فيصل وابتسام">
                <span>فيصل</span><b>&amp;</b><span>ابتسام</span>
              </div>
              <p className="invite-copy">يسرّنا دعوتكم لمشاركتنا فرحة حفل الملكة</p>
              <div className="date-row">
                <div><strong>الأحد</strong><span>12 ربيع الآخر 1449هـ</span></div>
                <div className="date-mark"><span>22</span><b>10</b><span>2030</span></div>
                <div><strong>الاستقبال</strong><span>الساعة 9:30 مساءً</span></div>
              </div>
              <div className="venue">
                <span className="pin" aria-hidden="true" />
                <div><strong>قاعة الأفراح — أبها</strong><small>نسعد بحضوركم وتشريفكم</small></div>
              </div>
              <button className="rsvp-trigger" onClick={goToRsvp}>تأكيد الحضور</button>
            </div>
          </article>

          <button
            className="envelope"
            type="button"
            onClick={openInvitation}
            aria-label={opened ? "تم فتح الدعوة" : "فتح الدعوة"}
            disabled={opened}
          >
            <span className="envelope-back" />
            <span className="paper-lining" />
            <span className="door door-right"><i /><b>حفل</b><small>بكل الحب</small></span>
            <span className="door door-left"><i /><b>ملكة</b><small>نتشرّف بحضوركم</small></span>
            <span className="stamp-date">22 · 10 · 2030</span>
            <span className="wax-seal">
              <span className="seal-rim" />
              <span className="seal-letter">ع</span>
            </span>
            <span className="reference-cover" aria-hidden="true" />
            <span className="seal-hotspot" aria-hidden="true"><i /></span>
          </button>
        </div>

        <button className="open-hint" onClick={openInvitation} disabled={opened}>
          <span>{opened ? "تم فتح الدعوة" : "افتح الدعوة"}</span>
          {!opened && <i aria-hidden="true">↓</i>}
        </button>
      </section>

      <section className="rsvp-section" ref={rsvpRef} id="rsvp" aria-labelledby="rsvp-title">
        <div className="rsvp-shell">
          <div className="section-heading">
            <span>ننتظر حضوركم بكل محبة</span>
            <h2 id="rsvp-title">تأكيد الحضور</h2>
            <p>فضلًا أكّد حضورك قبل موعد المناسبة، ويسعدنا أن تكون بيننا.</p>
          </div>

          {submitted ? (
            <div className="success-card" role="status">
              <div className="success-icon">✓</div>
              <h3>{attendance === "yes" ? "تم تأكيد حضورك" : "وصلنا اعتذارك"}</h3>
              <p>{attendance === "yes" ? "بانتظارك لتكتمل فرحتنا بحضورك." : "نقدّر اعتذارك، ونسأل الله أن يجمعنا على خير."}</p>
              <button onClick={() => setSubmitted(false)}>تعديل الرد</button>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={submitRsvp}>
              <label className="field">
                <span>الاسم الكريم</span>
                <input name="guestName" type="text" placeholder="اكتب اسمك" required />
              </label>

              <fieldset>
                <legend>هل ستشاركنا الفرحة؟</legend>
                <div className="attendance-options">
                  <label className={attendance === "yes" ? "selected" : ""}>
                    <input type="radio" name="attendance" value="yes" onChange={() => setAttendance("yes")} required />
                    <span className="option-icon">✓</span>
                    <strong>بكل سرور</strong>
                    <small>سأكون حاضرًا بإذن الله</small>
                  </label>
                  <label className={attendance === "no" ? "selected" : ""}>
                    <input type="radio" name="attendance" value="no" onChange={() => setAttendance("no")} required />
                    <span className="option-icon">—</span>
                    <strong>أعتذر عن الحضور</strong>
                    <small>مع خالص الدعوات</small>
                  </label>
                </div>
              </fieldset>

              {attendance === "yes" && (
                <label className="field count-field">
                  <span>عدد الحضور</span>
                  <select name="guestCount" defaultValue="1">
                    <option value="1">شخص واحد</option>
                    <option value="2">شخصان</option>
                    <option value="3">3 أشخاص</option>
                    <option value="4">4 أشخاص</option>
                  </select>
                </label>
              )}

              <label className="field">
                <span>رسالة لفيصل وابتسام <small>(اختياري)</small></span>
                <textarea name="message" placeholder="اكتب تهنئتك الجميلة هنا" rows={3} />
              </label>

              <button className="submit-rsvp" type="submit" disabled={!attendance}>إرسال التأكيد</button>
            </form>
          )}
        </div>
        <footer><span>فيصل</span><i>&amp;</i><span>ابتسام</span></footer>
      </section>
    </main>
  );
}
