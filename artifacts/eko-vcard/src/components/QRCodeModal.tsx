import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  name: string;
  title: string;
  company: string;
  lang: "sr" | "en";
  onToast: (msg: string) => void;
}

export function QRCodeModal({
  isOpen,
  onClose,
  url,
  name,
  title,
  company,
  lang,
  onToast,
}: QRCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const t = {
    sr: {
      heading: "Digitalni QR Kod",
      subheading: "Skenirajte kamerom telefona za instant pristup vizit karti",
      downloadPng: "Preuzmi QR sliku (.png)",
      copyLink: "Kopiraj link",
      copied: "Link vizit karte je kopiran ✓",
      downloaded: "QR kod je uspešno preuzet ✓",
      close: "Zatvori",
      footerNote: "Pogodno za štampu, ponude i email potpis",
    },
    en: {
      heading: "Digital QR Code",
      subheading: "Scan with your phone camera for instant contact access",
      downloadPng: "Download QR Image (.png)",
      copyLink: "Copy Link",
      copied: "Business card link copied ✓",
      downloaded: "QR Code downloaded successfully ✓",
      close: "Close",
      footerNote: "Ideal for print, proposals & email signatures",
    },
  }[lang];

  useEffect(() => {
    if (!isOpen) return;

    // Generate high resolution QR code data URL
    QRCode.toDataURL(url, {
      width: 500,
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark: "#060e1e",
        light: "#ffffff",
      },
    })
      .then((data) => setQrDataUrl(data))
      .catch((err) => console.error("Error generating QR:", err));
  }, [isOpen, url]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    if (!qrDataUrl) return;

    // Render an executive branded pass card to download
    const canvas = document.createElement("canvas");
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "#060e1e");
    bgGrad.addColorStop(0.5, "#0b1b3a");
    bgGrad.addColorStop(1, "#040914");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative glow
    const glowGrad = ctx.createRadialGradient(400, 200, 50, 400, 200, 350);
    glowGrad.addColorStop(0, "rgba(22, 163, 74, 0.22)");
    glowGrad.addColorStop(0.5, "rgba(30, 58, 138, 0.25)");
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);

    // Header company
    ctx.fillStyle = "#86efac";
    ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "2px";
    ctx.fillText(company.toUpperCase(), 400, 90);

    // Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
    ctx.fillText(name.toUpperCase(), 400, 140);

    // Title
    ctx.fillStyle = "#93c5fd";
    ctx.font = "500 20px system-ui, -apple-system, sans-serif";
    ctx.fillText(title, 400, 175);

    // QR container box
    const qrBoxSize = 440;
    const qrBoxX = (width - qrBoxSize) / 2;
    const qrBoxY = 220;

    ctx.fillStyle = "#ffffff";
    // Rounded rect
    const r = 24;
    ctx.beginPath();
    ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, [r]);
    ctx.fill();

    // QR Image
    const qrImg = new Image();
    qrImg.onload = () => {
      const padding = 20;
      ctx.drawImage(
        qrImg,
        qrBoxX + padding,
        qrBoxY + padding,
        qrBoxSize - padding * 2,
        qrBoxSize - padding * 2
      );

      // Footer texts
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "600 20px system-ui, -apple-system, sans-serif";
      ctx.fillText("DIGITALNA VIZIT KARTA • SCAN ME", 400, 715);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
      ctx.fillText("boban-eef.netlify.app", 400, 750);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "400 16px system-ui, -apple-system, sans-serif";
      ctx.fillText("www.eef.rs • celarevic.boban@eef.rs • +381 64 822 26 50", 400, 785);

      // Trigger download
      const link = document.createElement("a");
      link.download = `Boban_Celarevic_EKO_QR.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      onToast(t.downloaded);
    };
    qrImg.src = qrDataUrl;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      onToast(t.copied);
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="qr-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.heading}
    >
      <div
        className="qr-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="qr-modal-close"
          onClick={onClose}
          type="button"
          aria-label={t.close}
        >
          ✕
        </button>

        <div className="qr-modal-header">
          <div className="qr-modal-badge">EKO ELEKTROFRIGO</div>
          <h3 className="qr-modal-title">{t.heading}</h3>
          <p className="qr-modal-sub">{t.subheading}</p>
        </div>

        <div className="qr-canvas-wrap">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR Code"
              className="qr-img"
              width={260}
              height={260}
            />
          ) : (
            <div className="qr-loading">...</div>
          )}
        </div>

        <div className="qr-url-pill" onClick={handleCopyLink} title="Kliknite da kopirate link">
          <span>🔗</span> {url}
        </div>

        <p className="qr-owner-label">
          <strong>{name}</strong> • {title}
        </p>

        <div className="qr-actions">
          <button
            className="btn-qr-download"
            onClick={handleDownload}
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{t.downloadPng}</span>
          </button>

          <button
            className="btn-qr-copy"
            onClick={handleCopyLink}
            type="button"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span>{t.copyLink}</span>
          </button>
        </div>

        <p className="qr-footer-hint">{t.footerNote}</p>
      </div>
    </div>
  );
}
