"use client";

import { useState } from "react";

type Attendance = "yes" | "no" | "";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [attendance, setAttendance] = useState<Attendance>("");

  return (
    <main className="invitation-page" dir="rtl">
      <section className={`invitation-experience ${opened ? "is-open" : ""}`} aria-label="دعوة حفل ملكة فيصل وابتسام">
        <article className="inside-card" aria-hidden={!opened}>
          <div className="inside-frame">
            <span className="inside-ornament" aria-hidden="true">❦</span>
            <p className="inside-kicker">دعوة حفل ملكة</p>
            <p className="inside-blessing">بارك الله لهما وبارك عليهما<br />وجمع بينهما في خير</p>

            <h1 className="inside-names"><span>فيصل</span><i>و</i><span>ابتسام</span></h1>
            <p className="inside-copy">يسرّنا دعوتكم لمشاركتنا فرحة حفل الملكة</p>

            <div className="inside-details">
              <div><strong>الأحد</strong><span>12 ربيع الآخر 1449هـ</span></div>
              <div><strong>9:30 مساءً</strong><span>موعد الاستقبال</span></div>
              <div><strong>قاعة الأفراح</strong><span>أبها</span></div>
            </div>

            <div className="inline-rsvp" aria-live="polite">
              {!attendance ? (
                <>
                  <p>هل ستشاركوننا الفرحة؟</p>
                  <div className="rsvp-actions">
                    <button className="accept" onClick={() => setAttendance("yes")}>
                      <b>أؤكد الحضور</b><span>بكل سرور</span>
                    </button>
                    <button className="decline" onClick={() => setAttendance("no")}>
                      <b>أعتذر عن الحضور</b><span>مع خالص الدعوات</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className={`response-message ${attendance}`} role="status">
                  <span>{attendance === "yes" ? "✓" : "—"}</span>
                  <strong>{attendance === "yes" ? "تم تأكيد حضوركم" : "وصلنا اعتذاركم"}</strong>
                  <p>{attendance === "yes" ? "بحضوركم تكتمل فرحتنا، ننتظركم بكل محبة." : "نقدّر اعتذاركم، ونسأل الله أن يجمعنا بكم على خير."}</p>
                  <button onClick={() => setAttendance("")}>تعديل الرد</button>
                </div>
              )}
            </div>
          </div>
        </article>

        <button
          className="cover-card"
          type="button"
          onClick={() => setOpened(true)}
          aria-label="فتح دعوة فيصل وابتسام"
          disabled={opened}
        >
          <span className="theme-opening">تم بحمد الله ونعمته عقد قران</span>
          <span className="theme-monogram" aria-hidden="true">فـا</span>
          <span className="theme-diamond" aria-hidden="true">◆</span>
          <span className="theme-date">22 · 10 · 2030</span>
          <span className="theme-couple">فيصل <i>&amp;</i> ابتسام</span>
          <span className="theme-prayer">اللهم اجعله عقدًا تنعقد به سعادتنا<br />وارزقنا التمام الجميل</span>
          <span className="theme-invite">حضوركم يتمّم فرحتنا</span>
          <span className="theme-open-seal"><b>ف</b><i>ا</i></span>
          <span className="tap-label">اضغط لفتح الدعوة</span>
        </button>
      </section>
    </main>
  );
}
