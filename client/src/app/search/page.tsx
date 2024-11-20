'use client';

import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import TitleTab_2 from '@/components/elements/TitleTab_2';
import CardSrch from '@/components/Srch'

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="content search-content">
      <SearchWord> <div>검색어: {query} </div></SearchWord>
      <TitleTab_2 menu={['콘텐츠', '인물', '컬렉션', '유저']} />
      <div className="content-inner">
        <CardSrch srchProps={query}></CardSrch>
      </div>
    </div>
  );
}

const SearchWord = styled.div`
  width:100%;
  background-color:#F5F5F5;
  height:43px;

  div{
    width:100%;
    max-width:1320px;
    color:#5E5E64;
    margin:0 auto;
    font-size:20px;
    font-weight:600;
    height:43px;
    line-height:43px;
  }
`