import styled, { keyframes } from "styled-components";

export const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

export const TickerWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  overflow: hidden;
  flex: 1;
  min-width: 0;
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black 60px,
    black calc(100% - 60px),
    transparent 100%
  );
`;

export const LiveBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
  white-space: nowrap;
  flex-shrink: 0;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 6px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;

export const Track = styled.div<{ $paused: boolean }>`
  display: flex;
  gap: 0;
  animation: ${scroll} 40s linear infinite;
  animation-play-state: ${({ $paused }) => ($paused ? "paused" : "running")};
  width: max-content;
`;

export const PairItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--text-secondary);
  border-left: 1px solid var(--border-light);
`;

export const PairLabel = styled.span`
  color: var(--text-muted);
  font-size: 11px;
  letter-spacing: 0.05em;
`;

export const Rate = styled.span`
  color: var(--text-primary);
  font-weight: 700;
`;

export const Change = styled.span<{ $dir: "up" | "down" }>`
  color: ${({ $dir }) => ($dir === "up" ? "var(--positive)" : "var(--negative)")};
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const SeparatorDot = styled.span`
  color: var(--negative);
  font-size: 12px;
  padding: 0 8px 0 0;
`;
