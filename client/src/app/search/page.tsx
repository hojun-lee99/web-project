'use client';

import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import TitleTab_2 from '@/components/elements/TitleTab_2';
import CardSrch from '@/components/Srch';
import { useState } from 'react';

export default function Search() {
  const [tabSelector, setTabSelector] = useState<
    'content' | 'movie' | 'people' | 'collection' | 'user' | string
  >('content');
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  return (
    <div className="content search-content">
      <SearchWord>
        {' '}
        <div>검색어: {query} </div>
      </SearchWord>
      <TitleTab_2
        menu={[
          ['콘텐츠', 'content'],
          ['영화', 'movie'],
          ['인물', 'people'],
          ['컬렉션', 'collection'],
          ['유저', 'user'],
        ]}
        selected={tabSelector}
        select={setTabSelector}
      />
      <div className="content-inner">
        <CardSrch srchProps={query} selected={tabSelector}></CardSrch>
      </div>
    </div>
  );
}

const SearchWord = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  height: 43px;

  div {
    width: 100%;
    max-width: 1320px;
    color: #5e5e64;
    margin: 0 auto;
    font-size: 20px;
    font-weight: 600;
    height: 43px;
    line-height: 43px;
  }
`;
