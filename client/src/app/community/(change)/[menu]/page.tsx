'use client';

import styled from 'styled-components';
import PostList from '@/components/PostList';
import React, { useEffect, useRef, useState } from 'react';

const fakePost = [
  {
    id: 1,
    title: '첫 번째 게시글 제목',
    author: '사용자1',
    date: '2024-11-28',
    category: '카테고리',
    content:
      '첫 번째 게시글의 내용입니다. 이 게시글은 임시로 작성된 내용입니다. 첫 번째 게시글의 내용입니다. 이 게시글은 임시로 작성된 내용입니다. 첫 번째 게시글의 내용입니다. 이 게시글은 임시로 작성된 내용입니다. 첫 번째 게시글의 내용입니다. 이 게시글은 임시로 작성된 내용입니다. 첫 번째 게시글의 내용입니다. 이 게시글은 임시로 작성된 내용입니다. 첫 번째 게시글의 내용입니다. 이 게시글은 임시로 작성된 내용입니다.',
  },
  {
    id: 2,
    title: '두 번째 게시글 제목',
    author: '사용자2',
    date: '2024-11-27',
    category: '카테고리',
    content: '두 번째 게시글의 내용입니다. 자유롭게 읽고 의견을 남겨주세요!',
  },
  {
    id: 3,
    title: '세 번째 게시글 제목',
    author: '사용자3',
    date: '2024-11-26',
    category: '카테고리',
    content: '세 번째 게시글의 내용입니다. 도움이 필요합니다. 의견 부탁드려요.',
  },
  {
    id: 4,
    title: '네 번째 게시글 제목',
    author: '사용자4',
    date: '2024-11-25',
    category: '카테고리',
    content: '네 번째 게시글의 내용입니다. 유용한 자료를 공유합니다!',
  },
  {
    id: 5,
    title: '다섯 번째 게시글 제목',
    author: '사용자5',
    date: '2024-11-24',
    category: '카테고리',
    content: '다섯 번째 게시글의 내용입니다. 새로운 공지사항을 확인하세요.',
  },
];

interface MyPostDataV1 {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  category: string;
  content: string;
}

interface MyPostDataV2 {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
}

export default function Menu({ params }: { params: { menu: string } }) {
  const menuName = params.menu;
  const cut = 10;

  const [myPostDataV2, setMyPostDataV2] = useState<MyPostDataV2[]>();
  const [page, setPage] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const loadingHeight = 20;

  const fetchData = (myPostDataV2: MyPostDataV2 | MyPostDataV2[]) => {
    setMyPostDataV2((v) => {
      typeof myPostDataV2;
      if (v !== undefined) {
        if (Array.isArray(myPostDataV2)) {
          return [...v, ...myPostDataV2];
        }
        return [...v, myPostDataV2];
      }
      if (Array.isArray(myPostDataV2)) {
        return [...myPostDataV2];
      }
      return [myPostDataV2];
    });
  };

  useEffect(() => {
    setMyPostDataV2(fakePost);

    if (typeof window !== undefined) {
      const scrollFunc = () => {
        const cur = document.body.scrollHeight - document.body.scrollTop;

        const line = document.body.offsetHeight;

        if (cur - loadingHeight <= line) {
          setLoad((v) => {
            return true;
          });
        }
      };

      document.body.addEventListener('scroll', scrollFunc);

      return () => {
        document.body.removeEventListener('scroll', scrollFunc);
      };
    }
  }, []);

  useEffect(() => {
    if (load) {
      if (!loading) {
        setLoading((v) => {
          return true;
        });

        const FUNC = () => {
          const change = (myPostDataV2: MyPostDataV2 | MyPostDataV2[]) => {
            if (Array.isArray(myPostDataV2)) {
              return myPostDataV2.map((d) => {
                return { ...d, id: d.id + count * 10 };
              });
            }
            return { ...myPostDataV2, id: myPostDataV2.id + count * 10 };
          };
          fetchData(change(fakePost));
          setCount((v) => {
            return v + 1;
          });
          setLoad((v) => {
            return false;
          });
          setLoading((v) => {
            return false;
          });
        };
        setTimeout(FUNC, 1000);
      }
    }
  }, [load]);

  return (
    <React.Fragment>
      <MenuName>{menuName}</MenuName>
      {myPostDataV2 && <PostList posts={myPostDataV2} type={'post2'} />}
    </React.Fragment>
  );
}

const MenuName = styled.div`
  font-size: 20px;
  color: var(--color-primary-accent);
  font-weight: 600;
  margin-bottom: 10px;
`;
