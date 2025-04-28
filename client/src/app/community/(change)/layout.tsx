'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useParams, useSearchParams, usePathname } from 'next/navigation';
import LoginFilter from '@/components/auth/LoginFilter';
import { useEffect } from 'react';

const menu = [
  {
    link: '/',
    text: 'HOME',
  },
  {
    link: 'notice',
    text: '공지사항',
  },

  {
    link: 'category1',
    text: '카테고리1',
  },
  {
    link: 'category2',
    text: '카테고리2',
  },
  {
    link: 'category3',
    text: '카테고리3',
  },
];

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (pathname.split('/')[4] == 'update') {
    return <div>{children}</div>;
  }

  return (
    <div className="content">
      <div className="content-inner">
        <CommunityHeader>
          {/* <LoginFilter> */}
          <WriteButton href="/community/write">
            <div>
              <div className="profile"></div>
              <div>나누고 싶은 생각이 있으신가요?</div>
            </div>
            <i></i>
          </WriteButton>
          {/* </LoginFilter> */}
        </CommunityHeader>
        <Post>
          <PostMenu>
            <SearchInput>
              <i></i>
              <input type="text" placeholder="게시글 검색" />
            </SearchInput>
            <p>카테고리</p>
            <PostMenuItem>
              {menu.map((category, index) => (
                <li key={index}>
                  <Link
                    href={`/community/${category.link}`}
                    className="post-more"
                  >
                    {category.text}
                  </Link>
                </li>
              ))}
            </PostMenuItem>
          </PostMenu>
          <PostList>{children}</PostList>
        </Post>
      </div>
    </div>
  );
}

const CommunityHeader = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 36px;
`;

const WriteButton = styled(Link)`
  width: 100%;
  max-width: 749px;
  padding: 20px 49px;
  border-radius: 999px;
  background-color: var(--color-background-secondary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .profile {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #d9d9d9;
  }

  i {
    display: block;
    width: 36px;
    height: 36px;
    background: url('/icon-pen-line.svg');
  }
`;

const Post = styled.div`
  display: flex;
  gap: 56px;
`;

const PostMenu = styled.div`
  width: 240px;
  min-width: 240px;

  p {
    font-size: 13px;
    color: var(--color-text-tertiary);
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const PostList = styled.div`
  width: 100%;
  flex: 1;
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: 20px;

  i {
    position: absolute;
    top: 4px;
    left: 10px;
    width: 24px;
    height: 24px;
    background: url('/icon-search-line.svg') no-repeat center;
  }

  input {
    color: var(--color-text-tertiary);
    background-color: var(--color-background-secondary);
    padding: 8px 8px 8px 44px;
    border: none;
    width: 100%;
    border-radius: 4px;
  }
`;

const PostMenuItem = styled.ul`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
