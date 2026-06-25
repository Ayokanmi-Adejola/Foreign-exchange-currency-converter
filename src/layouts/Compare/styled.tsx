import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const CompareHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 0;
`;

export const CompareTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
`;

export const CompareSub = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 8px;
`;

export const CompareList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const CompareRow = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

export const FlagImg = styled.img`
  width: 22px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const FlagFallback = styled.div`
  width: 22px;
  height: 16px;
  border-radius: 2px;
  background: var(--border);
  flex-shrink: 0;
`;

export const CurrencyInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CurrencyCode = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
`;

export const CurrencyName = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Converted = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  text-align: right;
`;

export const RefRate = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  text-align: right;
  margin-left: 8px;
  white-space: nowrap;
`;

export const PinBtn = styled.button<{ $active: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "var(--accent-dim)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
  font-family: inherit;

  &:hover {
    border-color: var(--accent);
    background: var(--accent-dim);
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
  color: var(--text-muted);

  h3 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  p { font-size: 12px; line-height: 1.6; }
`;
