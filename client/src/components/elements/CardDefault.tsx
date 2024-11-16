'use client';

import styled from 'styled-components';

export default function CardDefault() {
  return (
    <CardWrap>
      <div className="card-photo">
        <div className="card-PhotoTxt">1</div>
        <div className="card-PhotoTxt">D-1</div>
        <div className="card-logo">W</div>
        <div className="card-WTS">+ 보고싶어요 <span className='cardWTSScr'>000</span></div>
      </div>
      <div className='card-text-wrap'>
        <div className="card-movie-title">영화제목</div>
        <div className="card-movie-desc">영화정보 <span className="card-movie-viewCnt">예매율 및 관객수</span></div>
      </div>
    </CardWrap>
  );
}

const CardWrap = styled.div`
  width:100%;
  height:auto;
  max-width:248px;
  max-height:423px;

  .card-photo{
    height:355px;
    max-height:355px;
    background-color:#C7C7C7;
    border-radius:4px;
    overflow:hidden;
    padding:10px;
    box-sizing:border-box;
    position:relative;

    .card-PhotoTxt {
      display:inline-block;
      width:auto;
      background-color:#101113;
      color:#fff;
      padding:3px 6px;
      min-width:28px;
      line-height:22px;
      text-align:center;
      float:left;
      border-radius:4px;
    }
    .card-logo{
      float:right;
      background-color:#fff;
      width:30px;
      height:30px;
      border-radius:15px;
    }
    .card-WTS{
      clear:both;
      background-color:#101113;
      color:#fff;
      position:absolute;
      width:100%;
      line-height:16px;
      padding:10px;
      bottom:-0;
      left:-0;
    }
    .cardWTSScr{
      float:right;
    }
  }

  .card-text-wrap{
    padding:5px 10px 0 0;

    .card-movie-title {
      font-size:16px;
      font-weight:500;
      line-height:22px;
    }
    .card-movie-desc {
      font-size:14px;
      font-weight:400;
      line-height:20px;
    }
    .card-movie-viewCnt {
      font-size:13px;
      font-weight:400;
      line-height:20px;
      color:#00B9AE;
    }
  }
`
