import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.5);
`;

export const Popover = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 201;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 360px;
  max-width: calc(100vw - 32px);
  max-height: 520px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
`;

export const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-light);
`;

export const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  opacity: 0.5;
  flex-shrink: 0;
`;

export const SearchInput = styled.input`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const List = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  &::-webkit-scrollbar-track { background: transparent; }
`;

export const GroupLabel = styled.li`
  padding: 6px 16px 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GroupCount = styled.span`
  color: var(--border);
`;

export const CurrencyRow = styled.li<{ $selected: boolean; $focused: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  background: ${({ $focused }) => ($focused ? "var(--surface-elevated)" : "transparent")};
  transition: background 0.1s;

  &:hover {
    background: var(--surface-elevated);
  }
`;

export const FlagImg = styled.img`
  width: 24px;
  height: 18px;
  border-radius: 3px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const FlagFallback = styled.div`
  width: 24px;
  height: 18px;
  border-radius: 3px;
  background: var(--border);
  flex-shrink: 0;
`;

export const CurrencyCode = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 40px;
`;

export const CurrencyName = styled.span`
  font-size: 12px;
  color: var(--text-secondary);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CheckIcon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;
