import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface PWAInstallBannerProps {
  lang: "sr" | "en";
  onToast: (msg: string) => void;
}

export function PWAInstallBanner({ lang, onToast }: PWAInstallBannerProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const t = {
    sr: {
      badge: "PWA APLIKACIJA",
      title: "Instaliraj na telefon",
      sub: "Brz pristup sa ekrana • Radi i bez interneta",
      btn: "Instaliraj",
      installed: "Aplikacija je aktivna na uređaju ✓",
      alreadyInstalled: "Aplikacija je već instalirana na vašem početnom ekranu ✓",
      iosTitle: "Instalacija na iPhone & iPad",
      iosSub: "Pratite 2 jednostavna koraka u Safari pretraživaču:",
      iosStep1Bold: "1. Dodirnite ikonicu 'Deli' (Share)",
      iosStep1Desc: "Nalazi se na dnu Safari ekrana (kvadrat sa strelicom na gore)",
      iosStep2Bold: "2. Izaberite 'Add to Home Screen'",
      iosStep2Desc: "Kliknite na 'Dodaj na početni ekran' (ikona sa znakom +)",
      iosStep3: "Zatim u gornjem desnom uglu potvrdite klikom na 'Add' (Dodaj)",
      close: "Razumem",
    },
    en: {
      badge: "PWA APPLICATION",
      title: "Install on Phone",
      sub: "Home screen shortcut • Works offline",
      btn: "Install",
      installed: "App installed on device ✓",
      alreadyInstalled: "The app is already installed on your home screen ✓",
      iosTitle: "Installation on iPhone & iPad",
      iosSub: "Follow 2 simple steps in Apple Safari:",
      iosStep1Bold: "1. Tap the 'Share' icon",
      iosStep1Desc: "Located in the bottom Safari toolbar (square with an arrow pointing up)",
      iosStep2Bold: "2. Select 'Add to Home Screen'",
      iosStep2Desc: "Tap 'Add to Home Screen' (plus icon +)",
      iosStep3: "Then tap 'Add' in the top right corner to confirm",
      close: "Got it",
    },
  }[lang];

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone === true ||
        document.referrer.includes("android-app://");
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for successful install
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      onToast(t.installed);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [onToast, t.installed]);

  const handleInstallClick = async () => {
    if (isStandalone) {
      onToast(t.alreadyInstalled);
      return;
    }

    if (deferredPrompt) {
      // Native Android / Chrome / Edge prompt
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setIsStandalone(true);
          onToast(t.installed);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error("Install prompt error:", err);
      }
    } else if (isIOS) {
      // iOS doesn't support beforeinstallprompt; show instructional sheet
      setShowIOSModal(true);
    } else {
      // Generic desktop / other browser instructions
      setShowIOSModal(true);
    }
  };

  if (dismissed) return null;

  // If already running standalone, show a very sleek verified badge
  if (isStandalone) {
    return (
      <div className="pwa-installed-pill anim-fade-up">
        <span className="pwa-dot" />
        <span className="pwa-installed-text">{t.installed}</span>
      </div>
    );
  }

  return (
    <>
      <div className="pwa-banner-card anim-fade-up">
        <div className="pwa-icon-box">
          <img
            src="/favicon.svg"
            alt="PWA Icon"
            className="pwa-mini-icon"
            width={34}
            height={34}
          />
        </div>

        <div className="pwa-text-box">
          <div className="pwa-badge-row">
            <span className="pwa-badge">{t.badge}</span>
            <span className="pwa-offline-tag">100% Offline</span>
          </div>
          <h4 className="pwa-title">{t.title}</h4>
          <p className="pwa-sub">{t.sub}</p>
        </div>

        <div className="pwa-actions">
          <button
            className="pwa-btn-install"
            onClick={handleInstallClick}
            type="button"
            aria-label={t.title}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{t.btn}</span>
          </button>
        </div>
      </div>

      {/* iOS & Browser Instructions Modal */}
      {showIOSModal && (
        <div
          className="ios-modal-backdrop"
          onClick={() => setShowIOSModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="ios-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="qr-modal-close"
              onClick={() => setShowIOSModal(false)}
              type="button"
            >
              ✕
            </button>

            <div className="ios-modal-header">
              <div className="ios-icon-emblem">📲</div>
              <h3 className="ios-modal-title">{t.iosTitle}</h3>
              <p className="ios-modal-sub">{t.iosSub}</p>
            </div>

            <div className="ios-steps-list">
              <div className="ios-step-item">
                <div className="ios-step-num">1</div>
                <div className="ios-step-content">
                  <strong>{t.iosStep1Bold}</strong>
                  <p>{t.iosStep1Desc}</p>
                  <div className="ios-visual-hint">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    <span>Dugme za deljenje (Share)</span>
                  </div>
                </div>
              </div>

              <div className="ios-step-item">
                <div className="ios-step-num">2</div>
                <div className="ios-step-content">
                  <strong>{t.iosStep2Bold}</strong>
                  <p>{t.iosStep2Desc}</p>
                  <div className="ios-visual-hint">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    <span>Dodaj na početni ekran (Add to Home Screen)</span>
                  </div>
                </div>
              </div>

              <p className="ios-step-final">{t.iosStep3}</p>
            </div>

            <button
              className="btn-ios-done"
              onClick={() => setShowIOSModal(false)}
              type="button"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
