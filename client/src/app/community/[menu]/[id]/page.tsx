'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function Post() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <div>
      <BackButton onClick={handleGoBack}>← Go Back</BackButton>
      <PostLayout>
        <PostHeader>
          <div>
            <p className="post-item_name">게시물제목</p>
            <div className="post-item_info">
              <span className="post-item_author">작성자</span>
              <span className="post-item_date">날짜</span>
              <div className="post-item_comment">
                <i></i> 10
              </div>
            </div>
          </div>
          <div className="post-item_pohto"></div>
        </PostHeader>
        <PostText>게시물 내용</PostText>
        <PostComment>
          <p>댓글</p>
        </PostComment>
      </PostLayout>
    </div>
  );
}

const BackButton = styled.div`
  color: var(--color-primary-accent);
`;

const PostLayout = styled.div`
  padding-top: 20px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .post-item_name {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
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
      background: url('/icon-message-circle-dots.svg') no-repeat center;
    }
  }

  .post-item_pohto {
    width: 56px;
    height: 56px;
    background-color: #ddd;
    border-radius: 50%;
  }
`;

const PostText = styled.div`
  margin-top: 36px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--color-border-primary);
  min-height: 200px;
`;

const PostComment = styled.div`
  margin-top: 36px;
  p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;
