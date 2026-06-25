import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
`;

export const FavTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
`;

export const FavCount = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 8px;
`;

export const FavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const FavRow = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  transition: background 0.1s;
  border-radius: 4px;

  &:last-child { border-bottom: none; }

  &:hover { background: var(--surface-elevated); padding-left: 8px; }
`;

export const FlagsStack = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const FlagImg = styled.img<{ $offset?: boolean }>`
  width: 22px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
  margin-left: ${({ $offset }) => ($offset ? "-6px" : "0")};
  border: 1px solid var(--surface);
`;

export const FlagFallback = styled.div<{ $offset?: boolean }>`
  width: 22px;
  height: 16px;
  border-radius: 2px;
  background: var(--border);
  margin-left: ${({ $offset }) => ($offset ? "-6px" : "0")};
`;

export const PairLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  opacity: 0.5;
`;

export const RateInfo = styled.div`
  text-align: right;
`;

export const LiveRate = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
`;

export const Change = styled.div<{ $dir: "up" | "down" }>`
  font-size: 11px;
  color: ${({ $dir }) => ($dir === "up" ? "var(--positive)" : "var(--negative)")};
`;

export const UnpinBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--accent-dim);
  border: 1px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
  font-family: inherit;

  &:hover {
    background: var(--negative-dim);
    border-color: var(--negative);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const StarIcon = styled.img`
  width: 14px;
  height: 14px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 20px;

  h3 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  p { font-size: 12px; color: var(--text-muted); line-height: 1.6; }
`;
