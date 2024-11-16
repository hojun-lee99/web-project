'use client';

import styled from 'styled-components';

export default function CardComment() {
  return (
    <CardWrap>
      <div className="comment-user">
        <div>
          <div className="comment-photo"></div>
          <div className="comment-id">닉네임</div>
          <div className="comment-logo"></div>
        </div>
        <div className="comment-rating"></div>
      </div>
      <div className="commnet-photo"></div>
      <div className="comment-text-wrap">
        <div className="comment-title">리뷰 제목</div>
        <div className="comment-desc">리뷰 내용</div>
      </div>
      <div className="comment-ico-wrap">
        <div className="comment-thumbsUp-cnt"></div>
        <div className="comment-reply-Cnt"></div>
      </div>
    </CardWrap>
  );
}

const CardWrap = styled.div`
  max-width:430px;
  max-height:182px;
  width:100%;
  border:1px solid #E0E0E0;
  color:#747474;
  border-radius:6px;
  padding:11px;
`;