'use client';

import styled from 'styled-components';

export default function CardComment() {
  return (
    <CardListWrap>
      <CardWrap>
        <div className="comment-user">
          <div className='comment-user-inner'>
            <div className="comment-user-photo"></div>
            <div className="comment-user-id">닉네임</div>
            <div className="comment-user-logo"></div>
          </div>
          <div className="comment-rating"></div>
        </div>
        <div className='comment-cont'>
          <div className="comment-photo"></div>
          <div className="comment-text-wrap">
            <div className="comment-title">리뷰 제목</div>
            <div className="comment-desc">리뷰 내용 </div>
          </div>
        </div>
        <div className="comment-ico-wrap">
          <div className="comment-thumbsUp-cnt">좋아요</div>
          <div className="comment-reply-Cnt">댓글수</div>
        </div>
      </CardWrap>
      <CardWrap>
        <div className="comment-user">
          <div className='comment-user-inner'>
            <div className="comment-user-photo"></div>
            <div className="comment-user-id">닉네임</div>
            <div className="comment-user-logo"></div>
          </div>
          <div className="comment-rating"></div>
        </div>
        <div className='comment-cont'>
          <div className="comment-photo"></div>
          <div className="comment-text-wrap">
            <div className="comment-title">리뷰 제목</div>
            <div className="comment-desc">리뷰 내용 </div>
          </div>
        </div>
        <div className="comment-ico-wrap">
          <div className="comment-thumbsUp-cnt">좋아요</div>
          <div className="comment-reply-Cnt">댓글수</div>
        </div>
      </CardWrap>
      <CardWrap>
        <div className="comment-user">
          <div className='comment-user-inner'>
            <div className="comment-user-photo"></div>
            <div className="comment-user-id">닉네임</div>
            <div className="comment-user-logo"></div>
          </div>
          <div className="comment-rating"></div>
        </div>
        <div className='comment-cont'>
          <div className="comment-photo"></div>
          <div className="comment-text-wrap">
            <div className="comment-title">리뷰 제목</div>
            <div className="comment-desc">리뷰 내용 </div>
          </div>
        </div>
        <div className="comment-ico-wrap">
          <div className="comment-thumbsUp-cnt">좋아요</div>
          <div className="comment-reply-Cnt">댓글수</div>
        </div>
      </CardWrap>
    </CardListWrap>
  );
}

const CardListWrap = styled.div`
  display:flex;
  justify-content:space-between;
`

const CardWrap = styled.div`
  cursor:pointer;
  max-width:430px;
  max-height:182px;
  height:182px;
  width:100%;
  border:1px solid #E0E0E0;
  color:#747474;
  border-radius:6px;
  padding:11px;

  .comment-ico-wrap{
    display:flex;
    gap:4px;
  }
  .comment-user-inner{
    width:100%;
    height:20px;
    display:flex;
    align-items:center;
    gap:4px;
    .comment-user-photo{
      width:20px;
      height:20px;
      border-radius:50%;
      background-color:#d7d7d7;
    }
    .comment-user-id{
      font-size:13px;
      line-height:20px;
      color:#747474;
      font-weight:500;
    }
    .comment-user-logo{
        background-color:#fff;
        width:12px;
        height:12px;
        border-radius:15px;
      }
    }

    .comment-cont{
      display:flex;
      gap:8px;
      padding:12px 0;
      border-bottom:1px solid #C7C7C7;

      .comment-photo{
        width:57px;
        height:84px;
        background-color:#d7d7d7;
      }
      .comment-text-wrap{
        flex:1;
        .comment-title{
          font-size:20px;
          font-weight:600;
          color:#141414;
          line-height:1;
          margin-bottom:4px;
        }
        .comment-desc{
          font-size:14px;
          color:#5E5E64;
          line-height:20px;
        }
      }
`;