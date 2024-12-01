'use client';

import CardDefault from '@/components/elements/CardDefault';
import TitleSm from '@/components/elements/TitleSm';
import CardComment from '@/components/elements/CardComment';
import CardArticel from '@/components/elements/CardArticel';
import MainBanner from '@/components/MainBanner';

export default function Home() {
  return (
    <div className="content main-content">
      <MainBanner></MainBanner>
      <div className="content-inner">
        <TitleSm title={'HOT 랭킹'} viewMore={true} cate={'rank'} />
        <CardDefault cate={'HOTRank'} />
      </div>
      <div className="content-inner">
        <TitleSm title={'지금 뜨는 코멘트'} viewMore={true} cate={'hotComment'} />
        <CardComment />
      </div>
      <div className="content-inner">
        <TitleSm title={'아티클'} viewMore={true} cate={'article'} />
        <CardArticel />
      </div>
      <div className="content-inner">
        <TitleSm title={'공개예정작'} viewMore={true} cate={'upcoming'} />
        <CardDefault cate={'Dday'} />
      </div>
    </div>
  );
}
