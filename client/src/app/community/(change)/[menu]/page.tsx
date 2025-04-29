'use client';

import styled from 'styled-components';
import PostList from '@/components/PostList';

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

export default function Menu({ params }: { params: { menu: string } }) {
  const menuName = params.menu;

  return (
    <>
      <MenuName>{menuName}</MenuName>
      <PostList posts={fakePost} type={'post2'} />
    </>
  );
}

const MenuName = styled.div`
  font-size: 20px;
  color: var(--color-primary-accent);
  font-weight: 600;
  margin-bottom: 10px;
`;
