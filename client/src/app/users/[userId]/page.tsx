'use client';

import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import UserCalender from '../../../components/UserCalender';

interface DataType {
  movie: number;
  series: number;
  books: number;
  webtoons: number;
}

interface CategoryItem {
  key: keyof DataType;
  label: string;
  count: number;
}

const data: DataType = {
  movie: 10,
  series: 3,
  books: 0,
  webtoons: 0,
};
const totalItems = Object.values(data).reduce((acc, value) => acc + value, 0);

const categories: CategoryItem[] = [
  { key: 'movie', label: '영화', count: data.movie },
  { key: 'series', label: '시리즈', count: data.series },
  { key: 'books', label: '책', count: data.books },
  { key: 'webtoons', label: '웹툰', count: data.webtoons },
];

export default function UserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return (
    <div className="content">
      <div className="content-inner">
        <UserWrap>
          <UserProfile>
            <div className="user-img">
              <img
                src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=500&h=500&q=80"
                alt={userId}
              />
            </div>
            <p className="user-id">{userId}</p>
            <p className="user-email">유저이메일@naver.com</p>
          </UserProfile>

          <UserClender>
            <Title>캘린더</Title>
            <UserCalender />
          </UserClender>

          <UserArchive>
            <Title>
              <div>
                보관함 <span>보관함갯수 +</span>
                <span>{totalItems}</span> {/* 데이터 합계 표시 */}
              </div>
              <div>
                <button type="button">내가 남긴 코멘트</button>
              </div>
            </Title>
            <UserArchiveList>
              {categories.map((category) => (
                <UserArchiveCategory key={category.key}>
                  <p className="archive-category">{category.label}</p>
                  {category.count > 0 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={20}
                      slidesPerView={8}
                      navigation
                    >
                      {Array.from({ length: category.count }).map(
                        (_, index) => (
                          <SwiperSlide key={index}>
                            <div>
                              <div className="archive-img"></div>
                              <p className="archive-title">
                                {category.label} 제목 {index + 1}
                              </p>
                              <p className="archive-rating">
                                평가함 <span>3.0</span>
                              </p>
                            </div>
                          </SwiperSlide>
                        ),
                      )}
                    </Swiper>
                  ) : (
                    <NOData>아직 평가한 항목이 없습니다.</NOData>
                  )}
                </UserArchiveCategory>
              ))}
            </UserArchiveList>
          </UserArchive>
        </UserWrap>
      </div>
    </div>
  );
}

const NOData = styled.div`
  width: 100%;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserArchiveCategory = styled.div`
  width: 100%;
  padding: 30px 0;
  border-bottom: 1px solid var(--color-border-primary);

  &:last-of-type {
    border-bottom: none;
  }
`;

const UserArchiveList = styled.div`
  width: 100%;

  .archive-category {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .archive-img {
    width: 145px;
    height: 208px;
    background-color: var(--color-background-tertiary);
    border-radius: 4px;
    border: 1px solid var(--color-border-primary);
    margin-bottom: 8px;
  }
  .archive-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .archive-rating {
    font-size: 14px;
    color: var(--color-primary-accent);
  }
`;

const UserWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const UserProfile = styled.section`
  width: 100%;

  .user-img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 16px;

    img {
      width: 100%;
    }
  }

  .user-id {
    font-size: 20px;
    margin-bottom: 4px;
    font-weight: 600;
  }

  .user-email {
    font-size: 14px;
    color: var(--color-text-tertiary);
  }
`;

const UserClender = styled.section`
  width: 100%;
`;

const UserArchive = styled.section`
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: var(--color-primary-accent);
    font-size: 14px;
    font-weight: 400;

    &:first-of-type {
      padding-left: 20px;
    }
  }
`;
