'use client';
import CardComment from "@/components/elements/CardComment";
import TitleLg from "@/components/elements/TitleLg";
import TitleTab from "@/components/elements/TitleTab";

export default function HotComment() {
  return (
    <div className="content">
      <div className="content-inner">
        <TitleLg title={'지금 뜨는 코멘트'}></TitleLg>
        <TitleTab menu={['인기', '최신']} />
        <CardComment direction={'col'}></CardComment>
      </div>
    </div>
  );
}
