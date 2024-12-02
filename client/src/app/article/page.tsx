'use client';

import TitleLg from "@/components/elements/TitleLg";
import TitleTab from "@/components/elements/TitleTab";

export default function Article() {
  return (
    <div className="content">
      <div className="content-inner">
        <TitleLg title={'아티클'}></TitleLg>
        <TitleTab menu={['인기', '최신']} />
      </div>
    </div>
  );
}
