import styled from "styled-components";

export const Section = styled.section`
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 16px;
`;

export const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 20px;
`;

export const PairRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 48px 1fr;
  gap: 8px;
  align-items: center;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
`;

export const AmountBox = styled.div`
  background: var(--surface-elevated);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BoxLabel = styled.label`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

export const BoxBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const AmountInput = styled.input`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  min-width: 0;
  font-family: inherit;

  &::placeholder {
    color: var(--text-muted);
  }

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ResultAmount = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CurrencyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: var(--accent);
    background: var(--surface-elevated);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const FlagImg = styled.img`
  width: 20px;
  height: 15px;
  border-radius: 2px;
  object-fit: cover;
`;

export const ChevronIcon = styled.img`
  width: 14px;
  height: 14px;
  opacity: 0.6;
`;

export const SwapBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  align-self: center;
  transition: background 0.15s, border-color 0.15s, transform 0.2s;
  font-family: inherit;

  &:hover {
    background: var(--border);
    border-color: var(--accent);
    transform: rotate(180deg);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 520px) {
    justify-self: center;
    transform: rotate(90deg);

    &:hover {
      transform: rotate(270deg);
    }
  }
`;

export const SwapIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const RateText = styled.p`
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FavoriteBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  background: ${({ $active }) => ($active ? "var(--accent)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  border-radius: 6px;
  color: ${({ $active }) => ($active ? "var(--bg)" : "var(--text-secondary)")};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
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

export const StarIcon = styled.img`
  width: 14px;
  height: 14px;
`;

export const LogBtn = styled.button`
  padding: 8px 14px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    border-color: var(--text-secondary);
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
