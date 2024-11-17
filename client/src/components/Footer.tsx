'use client';

import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterWrap>
      <FooterInner>
        <p>© 2024 Moviepedia. All rights reserved.</p>
        <p>
          본 사이트는 영화 정보 제공을 위해 다양한 데이터를 참고하였으며, 일부
          내용은 왓챠피디아를 참고하였습니다.
        </p>
      </FooterInner>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  height: 150px;
  width: 100%;
  background: #101113;
  color: var(--color-text-white);
  margin-top: auto;
  display: flex;
  align-items: center;
`;
const FooterInner = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  color: var(--color-text-tertiary);
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;
