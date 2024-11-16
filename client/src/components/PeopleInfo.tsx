'use client';

import styled from 'styled-components';

type PeopleInfoProps = {
  data: string;
};

export default function PeopleInfo({ data }: { data: string }) {
  let content;

  if (data === 'movies' || data === 'series') {
    content = <p>출연 / 제작</p>;
  } else if (data === 'books') {
    content = <p>저자 / 역자</p>;
  } else if (data === 'webtoon') {
    content = <p>작가</p>;
  }

  return (
    <InfoWrap>
      <header>{content}</header>
      <PeopleInfoList>
        <li>
          <div className="info-photo"></div>
          <div>
            <p className="info-name">감독이름</p>
            <p className="info-role">역할</p>
          </div>
        </li>
      </PeopleInfoList>
    </InfoWrap>
  );
}

const InfoWrap = styled.section`
  width: 100%;
  margin-top: 60px;

  header {
    display: flex;
    margin-bottom: 60px;
    justify-content: space-between;
    align-items: center;

    p {
      display: flex;
      font-size: 24px;
      align-items: center;
      font-weight: 600;
    }
  }
`;

const PeopleInfoList = styled.ul`
  width: 100%;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  li {
    display: flex;
    width: calc(25% - (60px / 4));
  }

  li > div:nth-of-type(2) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }

  .info-photo {
    background-color: var(--color-background-secondary);
    width: 56px;
    height: 56px;
    margin-right: 10px;
    border-radius: 4px;
    overflow: hidden;
  }

  .info-name {
    font-size: 16px;
    font-weight: 600;
  }

  .info-role {
    font-size: 14px;
  }
`;
