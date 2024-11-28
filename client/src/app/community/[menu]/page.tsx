'use client';

import styled from 'styled-components';

export default function Menu({ params }: { params: { menu: string } }) {
  const menuName = params.menu; // URL의 [menu] 값 추출

  return (
    <div className="content">
      <div className="content-inner">
        <p>이 페이지는 {menuName} 페이지</p>
      </div>
    </div>
  );
}
