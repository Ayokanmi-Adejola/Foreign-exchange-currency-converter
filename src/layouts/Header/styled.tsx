import styled from "styled-components";

export const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border-light);
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MetaCount = styled.span`
  color: var(--text-secondary);
`;

export const Dot = styled.span`
  color: var(--border);
`;

export const TickerBar = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  border-top: 1px solid var(--border-light);
  background: var(--surface);
  overflow: hidden;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

export const ThemeToggleBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: var(--accent);
    background: var(--border);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const LiveLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bg);
  background: var(--accent);
  white-space: nowrap;
  flex-shrink: 0;
  border-right: 1px solid var(--border-light);
  height: 100%;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--bg);
    box-shadow: 0 0 5px var(--bg);
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }
`;
