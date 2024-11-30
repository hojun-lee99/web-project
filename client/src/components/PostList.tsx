'use client';

import styled from 'styled-components';
import Link from 'next/link';

export default function PostList({
  posts,
  type,
}: {
  posts: {
    id: number;
    title: string;
    author: string;
    date: string;
    category: string;
    content: string;
  }[];
  type: 'notice' | 'post' | 'post2';
}) {
  return (
    <PostListInner type={type}>
      {posts.map((post) => (
        <li className="post-item" key={post.id}>
          <Link href={`/community/${post.category}/${post.id}`}>
            <div>
              {type === 'post' && (
                <span className="post-item_category">{post.category}</span>
              )}
              <span className="post-item_name">{post.title}</span>
            </div>
            {type === 'post2' && (
              <div className="post-item_content">
                <p>{post.content}</p>
              </div>
            )}
            <div className="post-item_info">
              <span className="post-item_author">{post.author}</span>
              <span className="post-item_date">{post.date}</span>
              <div className="post-item_comment">
                <i></i> 10
              </div>
            </div>
          </Link>
        </li>
      ))}
    </PostListInner>
  );
}

const PostListInner = styled.ul<{ type: 'notice' | 'post' | 'post2' }>`
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

  .post-item {
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      cursor: pointer;

      ${(props) =>
        props.type === 'post2' &&
        `
      border-bottom: 1px solid var(--color-border-primary);
       padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start
    `}
    }
  }

  .post-item_category {
    color: var(--color-text-tertiary);
    font-size: 12px;
    margin-right: 20px;
  }

  .post-item_name {
    font-size: 16px;
    font-weight: 600;

    ${(props) =>
      props.type === 'post2' &&
      `
       font-size: 20px;
    `}
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

  .post-item_content {
    margin-top: 5px;
    margin-bottom: 10px;
    color: var(--color-text-secondary);
    font-size: 14px;
    height: 34px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
