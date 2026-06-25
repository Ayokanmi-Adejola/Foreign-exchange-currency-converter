import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
`;

export const LogTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
`;

export const LogCount = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 8px;
`;

export const ClearBtn = styled.button`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--negative);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    border-color: var(--negative);
    background: var(--negative-dim);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const LogList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const LogRow = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child { border-bottom: none; }
`;

export const TimeStamp = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  min-width: 36px;
  flex-shrink: 0;
`;

export const PairInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PairLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ArrowIcon = styled.img`
  width: 10px;
  height: 10px;
  opacity: 0.5;
`;

export const Amounts = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
`;

export const Amount = styled.span`
  color: var(--text-secondary);
`;

export const DeleteBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid transparent;
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

export const DeleteIcon = styled.img`
  width: 14px;
  height: 14px;
  opacity: 0.5;
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
