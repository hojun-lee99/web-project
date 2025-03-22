'use client';

import Link from 'next/link';
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
      '첫 번째 게시글의 내용입니다. 이 게시글은 임시로 작성된 내용입니다.',
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

const PostArea = ({
  type,
  title,
  link,
  posts,
}: {
  type: 'notice' | 'post';
  title: string;
  link: string;
  posts: typeof fakePost;
}) => {
  return (
    <PostAreaWrapper>
      <div className="post-title">
        <p className="post-title_text">{title}</p>
        <Link href={link} className="post-more">
          더보기
        </Link>
      </div>
      <PostList posts={posts} type={type} />
    </PostAreaWrapper>
  );
};

export default function CommunityPage() {
  // return <div></div>;
  return (
    <>
      <PostArea
        type="notice"
        title="공지사항"
        link="/community/notice"
        posts={fakePost}
      />
      <PostArea
        type="post"
        title="최신글"
        link="/community/latest"
        posts={fakePost}
      />
      <PostListRow>
        <PostArea
          type="post"
          title="카테고리1"
          link="/community/category1"
          posts={fakePost}
        />
        <PostArea
          type="post"
          title="카테고리2"
          link="/community/category2"
          posts={fakePost}
        />
      </PostListRow>
    </>
  );
}

const PostAreaWrapper = styled.div`
  margin-bottom: 30px;
  width: 100%;
  flex: 1;

  .post-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border-primary);

    .post-title_text {
      font-size: 20px;
      font-weight: 600;
    }

    .post-more {
      font-size: 12px;
      color: var(--color-text-secondary);
      background: none;
      border: none;
    }
  }
`;

const PostListRow = styled.div`
  display: flex;
  width: 100%;
  gap: 36px;
`;
