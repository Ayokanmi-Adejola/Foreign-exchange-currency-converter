import styled from "styled-components";

export const Section = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 40px;

  @media (max-width: 768px) {
    padding: 0 16px 32px;
  }
`;

export const TabNav = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 20px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 16px 11px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? "var(--accent)" : "transparent")};
  margin-bottom: -1px;
  color: ${({ $active }) => ($active ? "var(--text-primary)" : "var(--text-muted)")};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
    border-radius: 4px;
  }
`;

export const Badge = styled.span`
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 10px;
  font-weight: 700;
  border-radius: 10px;
  padding: 1px 6px;
  min-width: 20px;
  text-align: center;
`;

export const Panel = styled.div``;
