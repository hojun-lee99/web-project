'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from '../../../components/Comment';
import PeopleInfo from '../../../components/PeopleInfo';
import StarRating from '../../../components/StarRating';
import axios from '../../../api/axios';

export default function Contents() {
  const [movie, setMovie] = useState(null);
  const category = 'movies'; //카테고리 정보 컴포넌트에 넘겨줘야 함

  useEffect(() => {
    const id = 550;
    fetchData(id);
  }, []);

  const fetchData = async (id: string | number) => {
    try {
      const { data: movieDetail } = await axios.get(`movie/${id}`, {
        params: { append_to_response: 'videos' },
      });

      setMovie(movieDetail);
      console.log(movieDetail);
    } catch (error) {
      console.error('Error fetching movie data:');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

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
        <ContentInfo2>
          <div className="content-poster"></div>
          <div>
            <div className="content-rating">
              <StarRating />
              <div className="content-rating_value">
                <span>3.3</span>
                <span>평균 별점</span>
              </div>
            </div>
            <div className="content-comment">
              <div>
                이 작품에 대한 <span>닉네임</span>님의 평가를 글로 남겨보세요.
              </div>
              <button>코멘트 남기기</button>
            </div>
            <div className="content-description">설명</div>
          </div>
        </ContentInfo2>
        <PeopleInfo data={category} />
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

const ContentInfo2 = styled.section`
  width: 100%;
  margin-top: 36px;
  display: flex;
  gap: 36px;

  > div:nth-of-type(2) {
    flex: 1;
  }

  .content-poster {
    width: 280px;
    height: 400px;
    background-color: var(--color-background-secondary);
  }

  .content-rating {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-border-primary);
  }

  .content-rating_value {
    display: flex;
    flex-direction: column;
    align-items: center;

    & span:nth-of-type(1) {
      font-size: 36px;
    }

    & span:nth-of-type(2) {
      font-size: 14px;
      color: var(--color-text-tertiary);
    }
  }

  .content-comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;

    button {
      padding: 10px;
      border: none;
      color: var(--color-text-white);
      background-color: var(--color-primary-accent);
      font-size: 14px;
    }
  }

  .content-description {
    padding-top: 20px;
    border-top: 1px solid var(--color-border-primary);
  }
`;

const CommentWrap = styled.section`
  width: 100%;
  margin-top: 60px;
`;
