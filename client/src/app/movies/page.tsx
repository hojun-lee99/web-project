'use client';

import CardDefault from '@/components/elements/CardDefault';
import TitleSm from '@/components/elements/TitleSm';

export default function Movies() {
  return (
    <div className="content">
      <div className="content-inner">
        <TitleSm title={'HOT 랭킹'} viewMore={true} cate={'rank'} />
        <CardDefault cate={'HOTRank'} />
      </div>

      <div className="content-inner">
        <TitleSm title={'공개예정작'} viewMore={false} cate={'upcoming'} />
        <CardDefault cate={'Dday'} />
      </div>
      <div className="content-inner">
        <TitleSm title={'top_rated'} viewMore={true} cate={'top_rated'} />
        <CardDefault cate={'top_rated'} />
      </div>

      <div className="content-inner">
        <TitleSm title={'now_playing'} viewMore={false} cate={'now_playing'} />
        <CardDefault cate={'now_playing'} />
      </div>
    </div>
  );
}
