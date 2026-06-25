import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('/assets/fonts/jetbrains-mono/jetbrains-mono-variable.ttf') format('truetype');
    font-weight: 100 800;
    font-style: normal;
    font-display: swap;
  }

  *, ::before, ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --bg: #161618;
    --surface: #232327;
    --surface-elevated: #2f2f34;
    --border: #3a3a3f;
    --border-light: #2a2a2f;

    --accent: #c9f000;
    --accent-dim: rgba(201,240,0,0.12);

    --text-primary: #ffffff;
    --text-secondary: #9a9aa0;
    --text-muted: #606066;

    --positive: #22c55e;
    --positive-dim: rgba(34,197,94,0.12);
    --negative: #ef4444;
    --negative-dim: rgba(239,68,68,0.12);
  }

  html[data-theme="light"] {
    --bg: #f5f5f3;
    --surface: #ffffff;
    --surface-elevated: #ededeb;
    --border: #d0d0cc;
    --border-light: #e4e4e0;

    --accent: #7ab000;
    --accent-dim: rgba(122,176,0,0.12);

    --text-primary: #111110;
    --text-secondary: #555552;
    --text-muted: #9a9a96;

    --positive: #16a34a;
    --positive-dim: rgba(22,163,74,0.12);
    --negative: #dc2626;
    --negative-dim: rgba(220,38,38,0.12);
  }

  html {
    min-height: 100vh;
    background: var(--bg);
  }

  body {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    background: var(--bg);
    color: var(--text-primary);
    margin: 0 auto;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::-webkit-scrollbar { width: 6px; }
  body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  body::-webkit-scrollbar-track { background: var(--bg); }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, input:focus, input:hover,
  textarea, textarea:focus, textarea:hover {
    outline: none;
    border: none;
    color: inherit;
    background: inherit;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, li {
    list-style: none;
  }

  img {
    border-style: none;
  }

  *:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export default GlobalStyle;
