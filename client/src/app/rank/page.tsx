'use client';
import TitleLg from "@/components/elements/TitleLg";
import TitleTab from "@/components/elements/TitleTab";
import CardRank from "@/components/elements/CardRank";

export default function Rank() {
  return (
    <div className="content">
      <div className="content-inner">
        <TitleLg title={'HOT 랭킹'}></TitleLg>
        <TitleTab menu={['전체', '큐레이션', '아티클', '신작소개', '클립', '오픈에디터']} />
        <CardRank />
      </div>
    </div>
  );
}
