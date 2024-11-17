'use client';

import styled from 'styled-components';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null;

  return (
    <PopupWrapper>
      <PopupContent>
        <PopupHeader>
          <p>{children}</p>
          <button onClick={onClose}>X</button>
        </PopupHeader>
        <PopupInner>내용</PopupInner>
      </PopupContent>
    </PopupWrapper>
  );
}

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  background: #fff;
  padding: 36px;
  border-radius: 8px;
  width: 820px;
  height: 700px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;

  p {
    font-size: 32px;
    font-weight: 600;
  }

  button {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--color-background-tertiary);
    color: var(--color-text-primary);
    cursor: pointer;
    border-radius: 4px;
    font-weight: 500;
    font-size: 20px;
  }
`;

const PopupInner = styled.div``;
