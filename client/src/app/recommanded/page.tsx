'use client';

import TitleLg from "@/components/elements/TitleLg";
import TitleSm from "@/components/elements/TitleSm";
import TitleTab from "@/components/elements/TitleTab";

export default function Recommanded() {

  return (
    <div className="content">
      <div className="content-inner">
        <TitleLg title={'추천'}></TitleLg>
        <TitleTab menu={['영화', '시리즈', '책']} />
        <TitleSm title={'User님 인생의 작품이 될지도 모르는 작품들'} viewMore={false} cate="" />
        <TitleSm title={'취향을 존중합니다. 대중들의 취향은 아니어도 User님에게는 맞는 작품들'} viewMore={false} cate="" />
        <TitleSm title={'가끔은 남들이 재밌게 본 작품들 어떨까요?'} viewMore={false} cate="" />
      </div >
    </div >
  );
}
