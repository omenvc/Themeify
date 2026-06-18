import { useState, useEffect } from 'react'

// ─── Theme definitions ────────────────────────────────────────────────────────

type ThemeName = 'light' | 'dark' | 'naija' | 'sunset' | 'ocean'

interface ThemeVars {
  '--bg-primary': string
  '--bg-secondary': string
  '--bg-tertiary': string
  '--text-primary': string
  '--text-secondary': string
  '--accent': string
}

const THEMES: Record<ThemeName, ThemeVars> = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--bg-tertiary': '#e2e8f0',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#64748b',
    '--accent': '#6366f1',
  },
  dark: {
    '--bg-primary': '#0f172a',
    '--bg-secondary': '#1e293b',
    '--bg-tertiary': '#334155',
    '--text-primary': '#f1f5f9',
    '--text-secondary': '#94a3b8',
    '--accent': '#818cf8',
  },
  naija: {
    '--bg-primary': '#0a2e1a',
    '--bg-secondary': '#0f3d22',
    '--bg-tertiary': '#1a522e',
    '--text-primary': '#fef3c7',
    '--text-secondary': '#d4b48c',
    '--accent': '#f59e0b',
  },
  sunset: {
    '--bg-primary': '#2d1b0e',
    '--bg-secondary': '#3d2410',
    '--bg-tertiary': '#4e2e14',
    '--text-primary': '#fde8c8',
    '--text-secondary': '#c49a6c',
    '--accent': '#f97316',
  },
  ocean: {
    '--bg-primary': '#0c1445',
    '--bg-secondary': '#0f1d60',
    '--bg-tertiary': '#162478',
    '--text-primary': '#ffffff',
    '--text-secondary': '#93c5fd',
    '--accent': '#06b6d4',
  },
}

// Visual identity of each swatch (bg = outer circle fill, dot = inner accent dot)
const SWATCH: Record<ThemeName, { bg: string; dot: string; label: string }> = {
  light:  { bg: '#ffffff', dot: '#6366f1', label: 'Light' },
  dark:   { bg: '#0f172a', dot: '#818cf8', label: 'Dark' },
  naija:  { bg: '#0a2e1a', dot: '#f59e0b', label: 'Naija Green' },
  sunset: { bg: '#2d1b0e', dot: '#f97316', label: 'Sunset' },
  ocean:  { bg: '#0c1445', dot: '#06b6d4', label: 'Ocean' },
}

const THEME_KEYS = Object.keys(THEMES) as ThemeName[]

// ─── Static content ───────────────────────────────────────────────────────────

const NAV_LINKS = ['Home', 'About', 'Work', 'Contact']

const STATS = [
  { number: '142', suffix: '+', label: 'Projects Shipped' },
  { number: '98',  suffix: '%', label: 'Client Satisfaction' },
  { number: '5',   suffix: '',  label: 'Years of Experience' },
]

const FEATURES = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    body1: 'Optimized for performance with sub-100ms response times across all devices.',
    body2: 'Your users get instant feedback, every interaction.',
  },
  {
    icon: '🎨',
    title: 'Fully Customizable',
    body1: 'Every color, font, and layout adapts to your brand without touching config files.',
    body2: 'Total design freedom — out of the box.',
  },
  {
    icon: '🔒',
    title: 'Secure by Default',
    body1: 'Enterprise-grade security baked in from the ground up — not bolted on later.',
    body2: 'Ship with confidence and sleep soundly.',
  },
]

const ALERTS: {
  type: 'success' | 'warning' | 'info'
  icon: string
  title: string
  body: string
  bg: string
  border: string
  titleColor: string
}[] = [
  {
    type: 'success',
    icon: '✅',
    title: 'Deployment Successful',
    body: 'Your app was deployed to production at 14:32 UTC. All health checks passed with zero errors.',
    bg: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.4)',
    titleColor: '#16a34a',
  },
  {
    type: 'warning',
    icon: '⚠️',
    title: 'High Memory Usage',
    body: 'Instance memory is at 87%. Consider scaling up or optimizing your database queries soon.',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.4)',
    titleColor: '#d97706',
  },
  {
    type: 'info',
    icon: 'ℹ️',
    title: 'Scheduled Maintenance',
    body: 'Planned downtime Sunday 02:00–04:00 UTC. Services may be intermittently unavailable.',
    bg: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.4)',
    titleColor: '#3b82f6',
  },
]

// Shorthand so every element that changes color transitions smoothly
const T = 'all 0.35s ease'

// ─── Component ────────────────────────────────────────────────────────────────

export default function ThemeSwitcherApp() {
  const [theme, setTheme] = useState<ThemeName>(
    () => (localStorage.getItem('theme') as ThemeName) || 'light'
  )

  useEffect(() => {
    const vars = THEMES[theme]
    ;(Object.entries(vars) as [string, string][]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      {/* Minimal base reset + placeholder styles */}
      <style>{`
        h1,h2,h3,h4,h5,h6 { margin:0; font-weight:inherit; line-height:1.1; }
        p { margin:0; }
        a { text-decoration:none; }
        button,input,textarea,select { font:inherit; }
        input::placeholder, textarea::placeholder { opacity:0.5; }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          transition: T,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '1.6',
        }}
      >
        {/* ══════════════════════════════════════════════════════════════════
            NAVBAR
        ══════════════════════════════════════════════════════════════════ */}
        <nav
          style={{
            backgroundColor: 'var(--bg-secondary)',
            transition: T,
            borderBottom: '1px solid rgba(128,128,128,0.12)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  backgroundColor: 'var(--accent)',
                  transition: T,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '17px',
                  color: '#fff',
                  letterSpacing: '-0.5px',
                }}
              >
                T
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'var(--text-primary)',
                  transition: T,
                  letterSpacing: '-0.3px',
                }}
              >
                Themeify
              </span>
            </div>

            {/* Nav links */}
            <div
              style={{
                display: 'flex',
                gap: '28px',
                listStyle: 'none',
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: T,
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <button
              style={{
                backgroundColor: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: T,
                flexShrink: 0,
                letterSpacing: '0.1px',
              }}
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* ══════════════════════════════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════════════════════════════ */}
        <main
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px 48px',
          }}
        >
          {/* ── THEME SELECTOR PANEL ── */}
          <section
            style={{
              backgroundColor: 'var(--bg-secondary)',
              transition: T,
              borderRadius: '20px',
              padding: '20px 28px',
              margin: '28px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              border: '1px solid rgba(128,128,128,0.1)',
            }}
          >
            {/* Label */}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  transition: T,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: '2px',
                }}
              >
                Theme
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  transition: T,
                }}
              >
                Click to switch
              </div>
            </div>

            {/* Swatches */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {THEME_KEYS.map((key) => {
                const isActive = theme === key
                const s = SWATCH[key]
                return (
                  <button
                    key={key}
                    title={s.label}
                    onClick={() => setTheme(key)}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: isActive
                        ? `3px solid var(--accent)`
                        : '3px solid rgba(128,128,128,0.25)',
                      outline: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                      outlineOffset: '2px',
                      cursor: 'pointer',
                      background: s.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      transform: isActive ? 'scale(1.12)' : 'scale(1)',
                      transition: 'transform 0.25s ease, border 0.25s ease, outline 0.25s ease',
                      boxShadow: isActive
                        ? '0 4px 14px rgba(0,0,0,0.25)'
                        : '0 1px 4px rgba(0,0,0,0.1)',
                    }}
                    aria-label={`Switch to ${s.label} theme`}
                    aria-pressed={isActive}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: s.dot,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Active label badge */}
            <div
              style={{
                marginLeft: 'auto',
                padding: '6px 16px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--accent)',
                transition: T,
                letterSpacing: '0.2px',
              }}
            >
              {SWATCH[theme].label}
            </div>
          </section>

          {/* ── HERO SECTION ── */}
          <section
            style={{
              textAlign: 'center',
              padding: '56px 0 52px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(128,128,128,0.15)',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent)',
                transition: T,
                marginBottom: '28px',
              }}
            >
              <span style={{ fontSize: '11px' }}>✦</span>
              Design System Playground
              <span style={{ fontSize: '11px' }}>✦</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(38px, 6vw, 72px)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                transition: T,
                letterSpacing: '-2px',
                lineHeight: 1.05,
                marginBottom: '22px',
              }}
            >
              Build beautiful things.
            </h1>

            <p
              style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                transition: T,
                maxWidth: '520px',
                margin: '0 auto 40px',
                lineHeight: 1.7,
              }}
            >
              A complete design system that adapts to any aesthetic. Pick a theme above — watch
              every element on this page transform instantly.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '14px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 36px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: T,
                  letterSpacing: '0.1px',
                }}
              >
                Start for free
              </button>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  border: '2px solid rgba(128,128,128,0.25)',
                  padding: '14px 36px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: T,
                }}
              >
                See examples →
              </button>
            </div>
          </section>

          {/* ── STATS ROW ── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '56px',
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  transition: T,
                  borderRadius: '18px',
                  padding: '30px 24px',
                  textAlign: 'center',
                  border: '1px solid rgba(128,128,128,0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: '44px',
                    fontWeight: 900,
                    color: 'var(--accent)',
                    transition: T,
                    letterSpacing: '-2px',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.number}
                  <span style={{ fontSize: '28px' }}>{stat.suffix}</span>
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    transition: T,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </section>

          {/* ── FEATURE CARDS ── */}
          <section style={{ marginBottom: '56px' }}>
            <div style={{ marginBottom: '36px' }}>
              <h2
                style={{
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  transition: T,
                  letterSpacing: '-0.8px',
                  marginBottom: '10px',
                }}
              >
                Everything you need
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  transition: T,
                  fontSize: '16px',
                  maxWidth: '440px',
                }}
              >
                Packed with features that scale from weekend project to enterprise product.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {FEATURES.map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    transition: T,
                    borderRadius: '18px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    border: '1px solid rgba(128,128,128,0.08)',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      backgroundColor: 'var(--bg-tertiary)',
                      transition: T,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px',
                    }}
                  >
                    {card.icon}
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      transition: T,
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      transition: T,
                      lineHeight: 1.65,
                    }}
                  >
                    {card.body1}
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      transition: T,
                      lineHeight: 1.65,
                    }}
                  >
                    {card.body2}
                  </p>

                  <a
                    href="#"
                    style={{
                      color: 'var(--accent)',
                      transition: T,
                      fontSize: '14px',
                      fontWeight: 600,
                      marginTop: 'auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Learn more →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* ── FORM + ALERTS (two-column on wide screens) ── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px',
              marginBottom: '56px',
              alignItems: 'start',
            }}
          >
            {/* ── FORM SECTION ── */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                transition: T,
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid rgba(128,128,128,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  transition: T,
                  letterSpacing: '-0.4px',
                  marginBottom: '6px',
                }}
              >
                Get in touch
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  transition: T,
                  marginBottom: '24px',
                }}
              >
                We'll reply within 24 hours. No spam, ever.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1.5px solid rgba(128,128,128,0.18)',
                    borderRadius: '9px',
                    padding: '12px 14px',
                    fontSize: '15px',
                    transition: T,
                    outline: 'none',
                    width: '100%',
                  }}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1.5px solid rgba(128,128,128,0.18)',
                    borderRadius: '9px',
                    padding: '12px 14px',
                    fontSize: '15px',
                    transition: T,
                    outline: 'none',
                    width: '100%',
                  }}
                />
                <textarea
                  placeholder="Your message…"
                  rows={5}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1.5px solid rgba(128,128,128,0.18)',
                    borderRadius: '9px',
                    padding: '12px 14px',
                    fontSize: '15px',
                    transition: T,
                    outline: 'none',
                    resize: 'vertical',
                    width: '100%',
                  }}
                />
                <button
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    padding: '13px',
                    borderRadius: '9px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: T,
                    width: '100%',
                    letterSpacing: '0.1px',
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* ── ALERT COMPONENTS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ marginBottom: '4px' }}>
                <h2
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    transition: T,
                    letterSpacing: '-0.4px',
                    marginBottom: '6px',
                  }}
                >
                  System Alerts
                </h2>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    transition: T,
                  }}
                >
                  Semantic banners that stay readable across every theme.
                </p>
              </div>

              {ALERTS.map((alert) => (
                <div
                  key={alert.type}
                  style={{
                    backgroundColor: alert.bg,
                    border: `1.5px solid ${alert.border}`,
                    borderRadius: '12px',
                    padding: '16px 18px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>
                    {alert.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '14px',
                        color: alert.titleColor,
                        marginBottom: '5px',
                      }}
                    >
                      {alert.title}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        transition: T,
                        lineHeight: 1.55,
                      }}
                    >
                      {alert.body}
                    </div>
                  </div>
                </div>
              ))}

              {/* Extra: theme-aware info card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  transition: T,
                  borderRadius: '12px',
                  padding: '18px',
                  border: '1px solid rgba(128,128,128,0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      transition: T,
                      boxShadow: '0 0 0 3px rgba(128,128,128,0.2)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      transition: T,
                    }}
                  >
                    All systems operational
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    transition: T,
                  }}
                >
                  Last checked 2 minutes ago · 99.98% uptime this month
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ══════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════ */}
        <footer
          style={{
            backgroundColor: '#090c14',
            color: '#64748b',
            padding: '36px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  backgroundColor: 'var(--accent)',
                  transition: T,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: '#fff',
                }}
              >
                T
              </div>
              <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '15px' }}>Themeify</span>
            </div>

            {/* Copyright */}
            <div style={{ fontSize: '13px' }}>
              © 2026 Themeify. Built with React & love.
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy', 'Terms', 'Contact'].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    color: '#64748b',
                    fontSize: '13px',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
