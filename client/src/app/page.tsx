import CardDefault from "@/components/elements/CardDefault";
import TitleSm from "@/components/elements/TitleSm";
import TitleMd from "@/components/elements/TitleMd";
import TitleLg from "@/components/elements/TitleLg";
import TitleTab from "@/components/elements/TitleTab";
import CardComment from "@/components/elements/CardComment";

export default function Home() {
  return (
    <div className="content">
      <div className="content-inner">
        <TitleSm></TitleSm>
        <TitleMd></TitleMd>
        <TitleLg></TitleLg>
        <TitleTab></TitleTab>
        <CardDefault></CardDefault>
        <CardComment></CardComment>
      </div>
    </div>
  );
}
