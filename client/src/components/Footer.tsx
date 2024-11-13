'use client';

import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterWrap>
      <FooterInner>footer</FooterInner>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  height: 350px;
  width: 100%;
  background: #101113;
  color: var(--color-text-white);
  margin-top: auto;
`;
const FooterInner = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
`;
