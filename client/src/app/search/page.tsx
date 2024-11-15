'use client';

import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="content">
      <div className="content-inner">검색어: {query}</div>
    </div>
  );
}
