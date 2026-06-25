import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: var(--surface-elevated);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StatLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

export const StatValue = styled.span<{ $color?: string }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ $color }) => $color ?? "var(--text-primary)"};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RangeRow = styled.div`
  display: flex;
  gap: 4px;

  @media (max-width: 400px) {
    flex-wrap: wrap;
  }
`;

export const RangeBtn = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "var(--accent)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  color: ${({ $active }) => ($active ? "var(--bg)" : "var(--text-muted)")};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    border-color: var(--accent);
    color: ${({ $active }) => ($active ? "var(--bg)" : "var(--accent)")};
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const ChartCard = styled.div`
  background: var(--surface-elevated);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 16px;
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const PairLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
`;

export const ChartMeta = styled.span`
  font-size: 11px;
  color: var(--text-muted);
`;

export const ErrorState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);

  h3 {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-secondary);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  p {
    font-size: 12px;
    line-height: 1.6;
  }
`;

export const LoadingState = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
`;
