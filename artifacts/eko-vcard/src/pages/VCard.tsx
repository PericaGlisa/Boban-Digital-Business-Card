import { useState, useRef, useCallback } from "react";

/* ════════════════════════════════════════
   CONTACT DATA
   Boban Čelarević — EKO ELEKTROFRIGO d.o.o.
════════════════════════════════════════ */
const C = {
  name: "Boban Čelarević",
  nameUpper: "BOBAN ČELAREVIĆ",
  initials: "BČ",
  company: "EKO ELEKTROFRIGO d.o.o.",

  // Mobile (Primary for call & WhatsApp)
  mob: "+381648222650",
  mobDisplay: "+381 64 822 26 50",

  // Landline / Office phones
  tel1: "+381113757287",
  tel1Display: "+381 11 375 72 87",

  tel2: "+381113757288",
  tel2Display: "+381 11 375 72 88",
  tel2AltDisplay: "00381 11 375 72 88",

  // Fax
  fax: "+381113757289",
  faxDisplay: "+381 11 375 72 89",

  // Email
  email: "celarevic.boban@eef.rs",

  // Website
  website: "https://www.eef.rs",
  websiteDisplay: "www.eef.rs",

  // Sedište (Headquarters)
  hqAddress: "Tošin bunar 164",
  hqCity: "Novi Beograd, Srbija",
  hqMaps: "https://www.google.com/maps/search/?api=1&query=To%C5%A1in+bunar+164%2C+Novi+Beograd%2C+Srbija",
  hqMapsApple: "https://maps.apple.com/?q=To%C5%A1in+bunar+164%2C+Novi+Beograd%2C+Srbija",

  // Veleprodaja, magacin (Wholesale & Warehouse)
  whAddress: "Svetolika Nikačevića 11",
  whCity: "Beograd-Zemun",
  whMaps: "https://www.google.com/maps/search/?api=1&query=Svetolika+Nika%C4%8Devi%C4%87a+11%2C+Zemun%2C+Beograd",
  whMapsApple: "https://maps.apple.com/?q=Svetolika+Nika%C4%8Devi%C4%87a+11%2C+Zemun%2C+Beograd",

  // WhatsApp
  whatsapp: "https://wa.me/381648222650?text=Zdravo%20Bobane%2C%20kontaktiram%20Vas%20putem%20digitalne%20vizit%20karte.",
};

const UI = {
  sr: {
    langLabel: "Jezik",
    companyKicker: "EKO ELEKTROFRIGO d.o.o.",
    position: "Rukovodilac sektora tehnike",
    subtitle: "Industrijski i komercijalni rashladni sistemi",
    saveContact: "Sačuvaj Kontakt",
    mobLabel: "Mobilni",
    callMob: "Pozovi Mob",
    telOffice1: "Fiksni 1",
    telOffice2: "Fiksni 2",
    faxLabel: "Fax",
    office: "Kancelarija",
    whatsapp: "WhatsApp Poruka",
    email: "Email",
    shareCard: "Podeli Karticu",
    locationsTitle: "Lokacije i Adrese",
    hqLabel: "Sedište kompanije",
    wholesales: "Veleprodaja, magacin",
    websites: "Zvanični web sajt",
    openMapsGoogle: "Otvori u Google Maps",
    openMapsApple: "Otvori u Apple Maps",
    trustField: "B2B HVAC & Rashladna rešenja",
    trustFast: "Direktan kontakt",
    saveCompatibility: "Kompatibilno sa iOS i Android kontaktima",
    contactSaved: "Kontakt je sačuvan (.vcf) ✓",
    linkCopied: "Link vizit karte je kopiran ✓",
    shareNotSupported: "Deljenje nije podržano u ovom browseru",
    phoneCopied: "Broj je kopiran ✓",
    faxCopied: "Fax broj je kopiran ✓",
    emailCopied: "Email je kopiran ✓",
    shareTitle: "Boban Čelarević | EKO ELEKTROFRIGO d.o.o.",
    shareText: "Boban Čelarević – Rukovodilac sektora tehnike\nEKO ELEKTROFRIGO d.o.o.\nMob: +381 64 822 26 50 • Tel: +381 11 375 72 87 • www.eef.rs",
    tagline: "Vaš pouzdan partner u rashladnoj tehnici od 1996. godine",
    activities: ["Rashladni sistemi", "Klimatizacija", "CA komore", "Inženjering"],
    vcfNote: "Boban Čelarević - Rukovodilac sektora tehnike\\nEKO ELEKTROFRIGO d.o.o.\\nSedište: Tošin bunar 164, Novi Beograd\\nVeleprodaja i magacin: Svetolika Nikačevića 11, Beograd-Zemun",
    vcfFileName: "Boban_Celarevic_EKO_SR.vcf",
  },
  en: {
    langLabel: "Language",
    companyKicker: "EKO ELEKTROFRIGO d.o.o.",
    position: "Head of Technical Department",
    subtitle: "Industrial & Commercial Refrigeration Solutions",
    saveContact: "Save Contact",
    mobLabel: "Mobile",
    callMob: "Call Mobile",
    telOffice1: "Office Tel 1",
    telOffice2: "Office Tel 2",
    faxLabel: "Fax",
    office: "Office",
    whatsapp: "WhatsApp Message",
    email: "Email",
    shareCard: "Share This Card",
    locationsTitle: "Locations & Addresses",
    hqLabel: "Headquarters",
    wholesales: "Wholesale & Warehouse",
    websites: "Official Website",
    openMapsGoogle: "Open in Google Maps",
    openMapsApple: "Open in Apple Maps",
    trustField: "B2B HVAC & Refrigeration",
    trustFast: "Direct Contact",
    saveCompatibility: "Compatible with iOS & Android",
    contactSaved: "Contact saved (.vcf) ✓",
    linkCopied: "Card link copied ✓",
    shareNotSupported: "Sharing is not supported on this browser",
    phoneCopied: "Number copied ✓",
    faxCopied: "Fax number copied ✓",
    emailCopied: "Email copied ✓",
    shareTitle: "Boban Čelarević | EKO ELEKTROFRIGO d.o.o.",
    shareText: "Boban Čelarević – Head of Technical Department\nEKO ELEKTROFRIGO d.o.o.\nMobile: +381 64 822 26 50 • Tel: +381 11 375 72 87 • www.eef.rs",
    tagline: "Your reliable refrigeration partner since 1996",
    activities: ["Refrigeration", "Air Conditioning", "CA Rooms", "Engineering"],
    vcfNote: "Boban Čelarević - Head of Technical Department\\nEKO ELEKTROFRIGO d.o.o.\\nHeadquarters: Tošin bunar 164, Novi Beograd\\nWholesale & Warehouse: Svetolika Nikačevića 11, Beograd-Zemun",
    vcfFileName: "Boban_Celarevic_EKO_EN.vcf",
  },
} as const;

/* ════════════════════════════════════════
   PREMIUM ICONS
════════════════════════════════════════ */

function IcoUserPlus() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="16" y1="11" x2="22" y2="11"/>
    </svg>
  );
}

function IcoPhone({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      <path d="M14.05 2a9 9 0 0 1 7.94 7.94" opacity="0.5"/>
      <path d="M14.05 6A5 5 0 0 1 18 10" opacity="0.5"/>
    </svg>
  );
}

function IcoBuilding({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function IcoFax({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
}

function IcoMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function IcoGlobe() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  );
}

function IcoPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function IcoCopy() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  );
}

function IcoCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function IcoExternal() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

function IcoShare() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <polyline points="16 6 12 2 8 6"/>
      <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  );
}

function IcoWA() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

/* ════════════════════════════════════════
   RIPPLE HOOK
════════════════════════════════════════ */
function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const fire = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
    const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
    const id = Date.now() + Math.random();
    setRipples(r => [...r, { id, x: cx - rect.left, y: cy - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 650);
  }, []);
  const els = ripples.map(rp => (
    <span key={rp.id} className="ripple" style={{ left: rp.x, top: rp.y }} />
  ));
  return { fire, els };
}

function getInitialLanguage(): "sr" | "en" {
  if (typeof navigator === "undefined") return "sr";
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const hasEnglish = browserLanguages.some((locale) =>
    locale?.toLowerCase().startsWith("en"),
  );
  return hasEnglish ? "en" : "sr";
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function VCard() {
  const [lang, setLang] = useState<"sr" | "en">(getInitialLanguage);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = UI[lang];

  const callRipple = useRipple();
  const waRipple = useRipple();
  const emailRipple = useRipple();
  const saveRipple = useRipple();
  const shareRipple = useRipple();

  const isIOS =
    typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const hqMapsUrl = isIOS ? C.hqMapsApple : C.hqMaps;
  const whMapsUrl = isIOS ? C.whMapsApple : C.whMaps;

  function showMsg(msg: string) {
    setToast(msg);
    setShowToast(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowToast(false), 2400);
  }

  function copyText(text: string, key: string, successMsg: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      showMsg(successMsg);
      setTimeout(() => {
        setCopiedKey(prev => (prev === key ? null : prev));
      }, 2100);
    });
  }

  function saveContact() {
    const vcf = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N;CHARSET=UTF-8:Čelarević;Boban;;;",
      `FN;CHARSET=UTF-8:${C.name}`,
      `ORG;CHARSET=UTF-8:${C.company}`,
      `TITLE;CHARSET=UTF-8:${t.position}`,
      `TEL;TYPE=CELL,VOICE:${C.mob}`,
      `TEL;TYPE=WORK,VOICE:${C.tel1}`,
      `TEL;TYPE=WORK,VOICE:${C.tel2}`,
      `TEL;TYPE=WORK,FAX:${C.fax}`,
      `EMAIL;TYPE=WORK,INTERNET:${C.email}`,
      `URL;TYPE=WORK:${C.website}`,
      `ADR;TYPE=WORK,POSTAL;CHARSET=UTF-8:;;${C.hqAddress};Novi Beograd;;;Srbija`,
      `ADR;TYPE=WORK;CHARSET=UTF-8:;;${C.whAddress};Beograd-Zemun;;;Srbija`,
      `NOTE;CHARSET=UTF-8:${t.vcfNote}`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = t.vcfFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMsg(t.contactSaved);
  }

  async function shareCard() {
    const shareData = {
      title: t.shareTitle,
      text: t.shareText,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showMsg(t.linkCopied);
      }
    } catch {
      // User cancelled share dialog
    }
  }

  return (
    <>
      {/* Background graphics */}
      <div className="bg-photo" />
      <div className="bg-overlay" />
      <div className="bg-noise" />

      {/* ── Card Shell ── */}
      <div className="card-wrap">
        <div className="card-surface">

          <div className="top-bar" />

          {/* Logo & Language Switcher */}
          <div className="header-zone anim-fade-up d1 signature-reveal">
            <img src="/eko-logo.png" alt="EKO Elektrofrigo" className="logo-img" />
            <div className="lang-switch" role="group" aria-label={t.langLabel}>
              <button
                className={`lang-btn${lang === "sr" ? " active" : ""}`}
                onClick={() => setLang("sr")}
                type="button">
                SR
              </button>
              <button
                className={`lang-btn${lang === "en" ? " active" : ""}`}
                onClick={() => setLang("en")}
                type="button">
                EN
              </button>
            </div>
          </div>

          <div className="divider anim-fade-in d1" />

          {/* Avatar Initials */}
          <div className="avatar-zone anim-fade-up d2">
            <div className="avatar-ring">
              <div className="avatar-inner">{C.initials}</div>
              <span className="avatar-dot" />
            </div>
          </div>

          {/* Identity */}
          <div className="identity-zone anim-fade-up d2">
            <p className="company-kicker">{C.company}</p>
            <h1 className="name-text">{C.nameUpper}</h1>
            <p className="position-text">{t.position}</p>
            <p className="subtitle-text">{t.subtitle}</p>
          </div>

          <div className="hero-rail anim-fade-up d3">
            <a href={C.website} target="_blank" rel="noopener noreferrer" className="hero-pill">
              {C.websiteDisplay}
            </a>
          </div>

          <div className="trust-strip anim-fade-up d3">
            <span className="trust-item">{t.trustField}</span>
            <span className="trust-dot">•</span>
            <span className="trust-item">{t.trustFast}</span>
          </div>

          <div className="divider anim-fade-in d3" />

          {/* ── Primary Actions ── */}
          <div className="actions-zone anim-fade-up d3">

            {/* Save Contact (VCF Download) */}
            <div className="save-wrap" style={{ padding: 0, margin: "0.2rem 0 0" }}>
              <div className="save-pulse" />
              <div className="save-pulse save-pulse-2" />
              <button
                className="btn btn-save"
                onClick={(e) => { saveRipple.fire(e); saveContact(); }}
                onTouchStart={saveRipple.fire}
                aria-label={t.saveContact}>
                <IcoUserPlus />
                <span className="btn-label">{t.saveContact}</span>
                {saveRipple.els}
              </button>
            </div>
            <p className="save-note">{t.saveCompatibility}</p>

            {/* 1. Mobile Phone (Prominent Dial + Copy) */}
            <div className="btn-group is-call">
              <a
                href={`tel:${C.mob}`}
                className="btn btn-call"
                onClick={callRipple.fire}
                onTouchStart={callRipple.fire}
                aria-label={t.callMob}>
                <div className="btn-phone-box">
                  <IcoPhone size={20} />
                  <div className="btn-phone-text">
                    <span className="btn-phone-badge">{t.mobLabel}</span>
                    <span className="btn-phone-num">{C.mobDisplay}</span>
                  </div>
                </div>
                {callRipple.els}
              </a>
              <div className="btn-group-sep" />
              <button
                className={`btn-inline-copy${copiedKey === "mob" ? " copied" : ""}`}
                onClick={() => copyText(C.mobDisplay, "mob", t.phoneCopied)}
                aria-label="Copy mobile number"
                title="Kopiraj broj">
                {copiedKey === "mob" ? <IcoCheck /> : <IcoCopy />}
              </button>
            </div>

            {/* 2. WhatsApp Direct Chat */}
            <a
              href={C.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              onClick={waRipple.fire}
              onTouchStart={waRipple.fire}
              aria-label="WhatsApp">
              <IcoWA />
              <span className="btn-label">{t.whatsapp}</span>
              {waRipple.els}
            </a>

            {/* 3. Office Phone 1 */}
            <div className="btn-group is-office">
              <a
                href={`tel:${C.tel1}`}
                className="btn btn-office"
                aria-label="Tel 1">
                <div className="btn-phone-box">
                  <IcoBuilding size={18} />
                  <div className="btn-phone-text">
                    <span className="btn-phone-badge">{t.telOffice1}</span>
                    <span className="btn-phone-num">{C.tel1Display}</span>
                  </div>
                </div>
              </a>
              <div className="btn-group-sep" />
              <button
                className={`btn-inline-copy${copiedKey === "tel1" ? " copied" : ""}`}
                onClick={() => copyText(C.tel1Display, "tel1", t.phoneCopied)}
                aria-label="Copy office phone 1"
                title="Kopiraj fiksni broj 1">
                {copiedKey === "tel1" ? <IcoCheck /> : <IcoCopy />}
              </button>
            </div>

            {/* 4. Office Phone 2 */}
            <div className="btn-group is-office">
              <a
                href={`tel:${C.tel2}`}
                className="btn btn-office"
                aria-label="Tel 2">
                <div className="btn-phone-box">
                  <IcoBuilding size={18} />
                  <div className="btn-phone-text">
                    <span className="btn-phone-badge">{t.telOffice2}</span>
                    <span className="btn-phone-num">{C.tel2Display}</span>
                  </div>
                </div>
              </a>
              <div className="btn-group-sep" />
              <button
                className={`btn-inline-copy${copiedKey === "tel2" ? " copied" : ""}`}
                onClick={() => copyText(C.tel2Display, "tel2", t.phoneCopied)}
                aria-label="Copy office phone 2"
                title="Kopiraj fiksni broj 2">
                {copiedKey === "tel2" ? <IcoCheck /> : <IcoCopy />}
              </button>
            </div>

            {/* 5. Fax */}
            <div className="btn-group is-fax">
              <a
                href={`tel:${C.fax}`}
                className="btn btn-fax"
                aria-label="Fax">
                <div className="btn-phone-box">
                  <IcoFax size={18} />
                  <div className="btn-phone-text">
                    <span className="btn-phone-badge">{t.faxLabel}</span>
                    <span className="btn-phone-num">{C.faxDisplay}</span>
                  </div>
                </div>
              </a>
              <div className="btn-group-sep" />
              <button
                className={`btn-inline-copy${copiedKey === "fax" ? " copied" : ""}`}
                onClick={() => copyText(C.faxDisplay, "fax", t.faxCopied)}
                aria-label="Copy fax number"
                title="Kopiraj fax broj">
                {copiedKey === "fax" ? <IcoCheck /> : <IcoCopy />}
              </button>
            </div>

            {/* 6. Email */}
            <div className="btn-group is-email">
              <a
                href={`mailto:${C.email}`}
                className="btn btn-email"
                onClick={emailRipple.fire}
                onTouchStart={emailRipple.fire}
                aria-label="Email">
                <span className="btn-email-label"><IcoMail />{t.email}</span>
                <span className="btn-email-addr">{C.email}</span>
                {emailRipple.els}
              </a>
              <div className="btn-group-sep" />
              <button
                className={`btn-inline-copy${copiedKey === "email" ? " copied" : ""}`}
                onClick={() => copyText(C.email, "email", t.emailCopied)}
                aria-label="Copy email address"
                title="Kopiraj email">
                {copiedKey === "email" ? <IcoCheck /> : <IcoCopy />}
              </button>
            </div>

            {/* 7. Share This Card */}
            <button
              className="btn btn-share"
              onClick={(e) => { shareRipple.fire(e); shareCard(); }}
              onTouchStart={shareRipple.fire}
              aria-label={t.shareCard}>
              <IcoShare />
              <span className="btn-label">{t.shareCard}</span>
              {shareRipple.els}
            </button>

          </div>

          <div className="divider anim-fade-in d4" />

          {/* ── Secondary Info (Websites & Locations) ── */}
          <div className="secondary-zone anim-fade-up d4" style={{ paddingTop: "1.125rem" }}>

            {/* Website Block */}
            <div className="info-block">
              <span className="section-label">{t.websites}</span>
              <a
                href={C.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-website">
                <IcoGlobe />
                <span>{C.websiteDisplay}</span>
                <span className="ext-arrow"><IcoExternal /></span>
              </a>
            </div>

            {/* Locations Block Header */}
            <span className="section-label" style={{ margin: "0.2rem 0 0" }}>
              {t.locationsTitle}
            </span>

            {/* Location 1: Headquarters (Tošin bunar 164) */}
            <a
              href={hqMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="address-card">
              <div className="address-icon"><IcoPin /></div>
              <div>
                <span className="address-badge">{t.hqLabel}</span>
                <p className="address-street">{C.hqAddress}</p>
                <p className="address-city">{C.hqCity}</p>
                <span className="address-hint">{isIOS ? t.openMapsApple : t.openMapsGoogle}</span>
              </div>
            </a>

            {/* Location 2: Veleprodaja, magacin (Svetolika Nikačevića 11) */}
            <a
              href={whMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="address-card">
              <div className="address-icon"><IcoPin /></div>
              <div>
                <span className="address-badge warehouse">{t.wholesales}</span>
                <p className="address-street">{C.whAddress}</p>
                <p className="address-city">{C.whCity}</p>
                <span className="address-hint">{isIOS ? t.openMapsApple : t.openMapsGoogle}</span>
              </div>
            </a>

          </div>

          {/* ── Footer ── */}
          <div className="footer-zone anim-fade-up d6">
            <div className="divider" style={{ margin: "0 0 1rem" }} />
            <div className="activity-chips">
              {t.activities.map(a => <span key={a} className="chip">{a}</span>)}
            </div>
            <p className="footer-tagline">{t.tagline}</p>
          </div>

          <div className="bottom-bar" />

        </div>
      </div>

      {/* Floating Notification Toast */}
      <div className={`toast-pill ${showToast ? "show" : ""}`}>{toast}</div>
    </>
  );
}
