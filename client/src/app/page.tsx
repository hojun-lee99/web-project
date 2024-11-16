'use client';

import CardDefault from "@/components/elements/CardDefault";
import TitleSm from "@/components/elements/TitleSm";
import TitleMd from "@/components/elements/TitleMd";
import TitleLg from "@/components/elements/TitleLg";
import TitleTab from "@/components/elements/TitleTab";
import CardComment from "@/components/elements/CardComment";
import CardArticel from "@/components/elements/CardArticel";
import MainBanner from "@/components/MainBanner";

import styled from "styled-components";

export default function Home() {
  return (
    <div className="content">
      <MainBanner></MainBanner>
      <div className="content-inner">
        <TitleSm title={"HOT 랭킹"} viewMore={false} />
        <CardDefault cate={"HOTRank"} />
      </div>
    </div>
  );
}

const HotRankCard = styled.div`
`