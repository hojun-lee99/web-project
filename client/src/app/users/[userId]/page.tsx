'use client';

import styled from 'styled-components';

export default function UserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return (
    <div className="content">
      <div className="content-inner">유저 ID: {userId}</div>
    </div>
  );
}
