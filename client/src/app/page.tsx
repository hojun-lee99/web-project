'use client';

import CardDefault from '@/components/elements/CardDefault';
import TitleSm from '@/components/elements/TitleSm';
import CardComment from '@/components/elements/CardComment';
import CardArticel from '@/components/elements/CardArticel';
import MainBanner from '@/components/MainBanner';

import {
  getLoginLocalStorage,
  saveLocalStorage,
  saveLocalStorageJsonParse,
  saveLocalStorageJsonStringify,
  setLoginLocalStorage,
} from '@/utils/loginUtils';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    try {
      const asdf = {
        userid: 'hello',
        jwt: 'world',
      } as saveLocalStorage;
      setLoginLocalStorage(asdf);
      const get = getLoginLocalStorage();
      console.log(get);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="content main-content">
      <MainBanner></MainBanner>
      <div className="content-inner">
        <TitleSm title={'HOT 랭킹'} viewMore={true} cate={'rank'} />
        <CardDefault cate={'HOTRank'} />
      </div>
      <div className="content-inner">
        <TitleSm
          title={'지금 뜨는 코멘트'}
          viewMore={true}
          cate={'hotComment'}
        />
        <CardComment direction="row" />
      </div>
      <div className="content-inner">
        <TitleSm title={'아티클'} viewMore={true} cate={'article'} />
        <CardArticel />
      </div>
      <div className="content-inner">
        <TitleSm title={'추천'} viewMore={true} cate={'recommanded'} />
        <CardDefault cate={'top_rated'} />
      </div>
      <div className="content-inner">
        <TitleSm title={'공개예정작'} viewMore={false} cate={'upcoming'} />
        <CardDefault cate={'Dday'} />
      </div>
    </div>
  );
}
