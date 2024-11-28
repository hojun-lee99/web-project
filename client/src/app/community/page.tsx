'use client';

import styled from 'styled-components';
import Link from 'next/link';

export default function Community() {
  return (
    <div className="content">
      <div className="content-inner">
        <CommunityHeader>
          <WriteButton type="button">
            <div>
              <div className="profile"></div>
              <div>나누고 싶은 생각이 있으신가요?</div>
            </div>
            <i></i>
          </WriteButton>
        </CommunityHeader>
        <Post>
          <PostMenu>
            <input type="text" placeholder="게시글 검색" />
            <ul>
              <li>메뉴1</li>
              <li>메뉴1</li>
              <li>메뉴1</li>
              <li>메뉴1</li>
              <li>메뉴1</li>
            </ul>
          </PostMenu>
          <PostList>
            <PostArea>
              <div className="post-title">
                <p className="post-title_text">공지사항</p>
                <Link href="/community/notice" className="post-more">
                  더보기
                </Link>
              </div>
              <ul className="post-list">
                <li className="post-item">
                  <div>
                    <span className="post-item_category">카테고리</span>
                    <span className="post-item_name">게시글 제목</span>
                  </div>
                  <div className="post-item_info">
                    <span className="post-item_author">작성자</span>
                    <span className="post-item_date">날짜</span>
                    <div className="post-item_comment">
                      <i></i> 10
                    </div>
                  </div>
                </li>
              </ul>
            </PostArea>
          </PostList>
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

const WriteButton = styled.button`
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
  gap: 36px;
`;

const PostMenu = styled.div`
  width: 280px;
`;

const PostList = styled.div`
  width: 100%;
  flex: 1;
`;
const PostArea = styled.div`
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

  .post-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
  }

  .post-item_category {
    color: var(--color-text-tertiary);
    font-size: 12px;
    margin-right: 20px;
  }

  .post-item_name {
    font-size: 16px;
    font-weight: 600;
  }

  .post-item_info {
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: var(--color-text-tertiary);
    align-items: center;
  }

  .post-item_author {
    position: relative;
    padding-right: 4px;

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background-color: var(--color-text-tertiary);
      top: 50%;
      right: -4px;
      transform: translateY(-50%);
    }
  }

  .post-item_comment {
    display: flex;
    align-items: center;
    gap: 4px;

    i {
      display: inline-block;
      width: 21px;
      height: 21px;
      background: url('/icon-message-circle-dots.svg');
    }
  }
`;
