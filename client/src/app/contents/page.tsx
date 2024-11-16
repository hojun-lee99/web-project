'use client';

import styled from 'styled-components';
import Comment from '../../components/Comment';

export default function Contents() {
  return (
    <div className="content">
      <StillCut>
        <div className="content-inner">
          <ContentInfo>
            <p className="content-title">title</p>
            <p className="content-small-title">small title</p>
            <p>
              <span className="content-year">2023</span>
              <span className="content-genre">장르</span>
              <span className="content-country">국가</span>
            </p>
            <p>
              <span className="content-runtime">러닝타임</span>
              <span className="content-rating">등급</span>
            </p>
          </ContentInfo>
        </div>
      </StillCut>
      <div className="content-inner">
        <Profile>
          <div className="profile">출연/제작</div>
        </Profile>
        <CommentWrap>
          <Comment />
        </CommentWrap>
      </div>
    </div>
  );
}

const StillCut = styled.div`
  width: 100%;
  height: 550px;
  background: #eee;

  .content-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const ContentInfo = styled.div`
  position: absolute;
  left: 0;
  bottom: 60px;
  p {
    font-size: 14px;
    margin-top: 16px;
  }
  span {
    display: inline-block;
    padding: 0 4px;
  }
  .content-title {
    font-size: 36px;
    margin-bottom: 16px;
    font-weight: 600;
  }
`;

const Profile = styled.section`
  height: 300px;
`;

const CommentWrap = styled.section`
  width: 100%;
  margin-top: 60px;
`;
