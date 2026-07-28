import { FormEvent, useEffect, useState } from "react";
// import "../components/styles/construction.css";

const TASKS = [
  "sharpening the khurpi…",
  "airing out the gunny sacks…",
  "sorting seeds by the fistful…",
  "watering the mogra cuttings…",
  "labelling the clay pots…",
  "sweeping the courtyard…",
];

function PotMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M40 55 C35 40 42 30 60 30 C78 30 85 40 80 55"
        stroke="#4f6b43"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <path
        d="M60 30 C58 20 62 12 60 4"
        stroke="#4f6b43"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <path
        d="M60 4 C64 8 70 8 72 4"
        stroke="#4f6b43"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M60 4 C57 9 51 10 48 7"
        stroke="#4f6b43"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M28 58 L34 100 C34.5 105 39 108 44 108 L76 108 C81 108 85.5 105 86 100 L92 58 Z"
        fill="#bf5b34"
      />

      <path
        d="M26 58 L94 58 L91 68 L29 68 Z"
        fill="#8c4a2f"
      />
    </svg>
  );
}

function FenceDivider() {
  return (
    <svg
      className="fence-divider"
      viewBox="0 0 800 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="14"
        x2="800"
        y2="14"
        stroke="#8c4a2f"
        strokeWidth="3"
      />

      <line
        x1="0"
        y1="44"
        x2="800"
        y2="44"
        stroke="#8c4a2f"
        strokeWidth="3"
      />

      {Array.from({ length: 27 }).map((_, i) => (
        <rect
          key={i}
          x={8 + i * 30}
          y="4"
          width="10"
          height="52"
          rx="4"
          fill="#efe2c6"
          stroke="#8c4a2f"
          strokeWidth="2.5"
        />
      ))}
    </svg>
  );
}

export default function Construction() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTaskIndex((currentIndex) => {
        return (currentIndex + 1) % TASKS.length;
      });
    }, 2600);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="construction-page">
      {/* Header */}
      <header className="construction-header anim-sway">
        <svg
          className="header-decoration"
          viewBox="0 0 280 46"
          aria-hidden="true"
        >
          <line
            x1="20"
            y1="0"
            x2="55"
            y2="40"
            stroke="#8c4a2f"
            strokeWidth="2"
          />

          <line
            x1="260"
            y1="0"
            x2="225"
            y2="40"
            stroke="#8c4a2f"
            strokeWidth="2"
          />
        </svg>

        <div className="logo-container">
          <PotMark className="logo-pot" />

          <span className="logo-text">desi kadai</span>
        </div>
      </header>

      {/* Main */}
      <main className="construction-main">
        <p className="eyebrow">
          the shop shutter is half up
        </p>

        <h1>
          Your neighbourhood kadai,
          <br />
          taking root online.
        </h1>

        <p className="description">
          Native seeds, hardy saplings and the tools your grandmother&apos;s
          gardener swore by — soon a click away. We&apos;re still potting
          things up back here.
        </p>

        {/* Status */}
        <div className="status-wrapper anim-tag-sway">
          <svg
            className="status-string"
            viewBox="0 0 4 34"
            aria-hidden="true"
          >
            <line
              x1="2"
              y1="0"
              x2="2"
              y2="34"
              stroke="#2e2419"
              strokeWidth="1.5"
            />
          </svg>

          <div className="status-card">
            <span
              className="status-pin"
              aria-hidden="true"
            />

            <span className="status-label">
              status
            </span>

            <span
              key={taskIndex}
              className="status-task anim-fade-in"
            >
              {TASKS[taskIndex]}
            </span>
          </div>
        </div>

        {/* Email */}
        {submitted ? (
          <p className="success-message">
            Noted — we&apos;ll write to you the day the gate opens.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="email-form"
          >
            <label
              htmlFor="email"
              className="sr-only"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">
              Notify me
            </button>
          </form>
        )}

        {/* Divider */}
        <FenceDivider />

        {/* Categories */}
        <ul className="categories">
          <li>Seeds</li>
          <li>Saplings</li>
          <li>Tools</li>
        </ul>
      </main>

      {/* Footer */}
      <footer className="construction-footer">
        <p>
          Questions in the meantime? Write to{" "}
          <a href="mailto:desikadai8@gmail.com">
            desikadai8@gmail.com
          </a>
        </p>

        <p className="copyright">
          © {new Date().getFullYear()} Desi Kadai
        </p>
      </footer>
    </div>
  );
}