'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import LoginFilterPopup from '@/components/auth/LoginFilterPopup';
import LoginFilter from '@/components/auth/LoginFilter';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface PostData {
  id: string;
  title: string;
  userId: string;
  category: string;
  contents: string;
  createdAt: Date;
  comments: PostComment[];
}
interface PostComment {
  id: string;
  userId: string;
  contents: string;
  postId: string;
  parentId?: string;
  createdAt: Date;
  children?: PostComment[];
}

interface CommentForm {
  contents: string;
  userId: string;
  postId: string;
  parentId: string;
}

export default function Post() {
  const router = useRouter();
  const [postData, setPostData] = useState<PostData>();

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  useEffect(() => {
    const testData: PostData = {
      id: '123',
      userId: 'world',
      title: 'hello',
      category: 'cate1',
      contents: '<p>hello world~</p><p>hello world</p>',
      createdAt: new Date(),
      comments: [
        {
          id: '321',
          userId: 'world',
          contents: 'u jam',
          createdAt: new Date(),
          postId: '123',
          children: [
            {
              id: '4321',
              userId: 'world',
              contents: 'no jam',
              createdAt: new Date(),
              postId: '123',
            } as PostComment,
          ],
        } as PostComment,
        {
          id: '321',
          userId: 'world',
          contents: 'u jam',
          createdAt: new Date(),
          postId: '123',
          children: [
            {
              id: '4321',
              userId: 'world',
              contents: 'no jam',
              createdAt: new Date(),
              postId: '123',
            } as PostComment,
            {
              id: '4321',
              userId: 'world',
              contents: 'no jam',
              createdAt: new Date(),
              postId: '123',
            } as PostComment,
          ],
        } as PostComment,
      ],
    };
    setPostData(testData);
  }, []);
  if (!postData) {
    return <div></div>;
  }
  return (
    <div>
      <BackButton onClick={handleGoBack}>← Go Back</BackButton>
      <PostLayout>
        <PostHeader>
          <div>
            <p className="post-item_name">{postData.title}</p>
            <div className="post-item_info">
              <span className="post-item_author">{postData.userId}</span>
              <span className="post-item_date">
                {postData.createdAt.toLocaleString()}
              </span>
              <div className="post-item_comment">
                <i></i> {postData.comments.length}
              </div>
            </div>
          </div>
          <div className="post-item_pohto"></div>
        </PostHeader>
        <PostText>{postData.contents}</PostText>
        {/*  */}
        <MyComment data={postData.comments}></MyComment>
        {/*  */}
      </PostLayout>
    </div>
  );
}

function MyCommentForm() {
  const maxLength = 10;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CommentForm>();
  const [refresh, setRefresh] = useState<boolean>();
  const toggle = () => {
    setRefresh((v) => {
      return !v;
    });
  };

  return (
    <React.Fragment>
      <div className="comment-head">댓글</div>
      <div className="comment-textarea">
        <form
          style={{ all: 'unset', display: 'contents' }}
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();
            console.log(data);
          })}
        >
          <CommentTextarea
            {...register('contents', {
              required: true,
              onChange: (e) => {
                toggle();
              },
              maxLength: {
                value: maxLength,
                message: 'max: ' + maxLength.toString(),
              },
            })}
            placeholder="PostComment"
            maxLength={maxLength}
          ></CommentTextarea>

          <div>
            <span style={{ marginRight: '15px' }}>
              {(getValues('contents')
                ? getValues('contents').length.toString()
                : '0') +
                ' / ' +
                maxLength}
            </span>
            {/* <LoginFilter> */}
            <button className="comment-submit" type="submit">
              등록
            </button>
            {/* </LoginFilter> */}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

function MyReplyCommentForm() {
  const maxLength = 10;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CommentForm>();
  const [refresh, setRefresh] = useState<boolean>();
  const toggle = () => {
    setRefresh((v) => {
      return !v;
    });
  };
  return (
    <div className="comment-reply-textarea">
      <div className="comment-user-profile"></div>
      <div className="comment-textarea">
        <form
          style={{ all: 'unset', display: 'contents' }}
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();
            console.log(data);
          })}
        >
          <CommentTextarea
            {...register('contents', {
              required: true,
              onChange: (e) => {
                toggle();
              },
              maxLength: {
                value: maxLength,
                message: 'max: ' + maxLength.toString(),
              },
            })}
            placeholder="PostComment"
            maxLength={maxLength}
          ></CommentTextarea>
          <div>
            <span style={{ marginRight: '15px' }}>
              {(getValues('contents')
                ? getValues('contents').length.toString()
                : '0') +
                ' / ' +
                maxLength}
            </span>
            {/* <LoginFilter> */}
            <button className="comment-submit" type="button">
              등록
            </button>
            {/* </LoginFilter> */}
          </div>
        </form>
      </div>
    </div>
  );
}

function MyCommentView({ data, toggle }: { data: PostComment; toggle: any }) {
  return (
    <div className="comment-item-user">
      <div className="comment-item-head">
        <div>
          <div className="comment-user-profile"></div>
          <div className="comment-user-name">{data.userId}</div>
          <div className="comment-date">
            {data.createdAt.toLocaleTimeString()}
          </div>
        </div>

        <div
          className="comment-reply-button"
          onClick={() => {
            toggle();
          }}
        >
          답글달기
        </div>
      </div>
      <div className="comment-item-user_text">{data.contents}</div>
    </div>
  );
}

function MyReplyCommentView({ data }: { data: PostComment }) {
  return (
    <React.Fragment>
      <div className="comment-item-head">
        <div>
          <div className="comment-user-profile"></div>
          <div className="comment-user-name">{data.userId}</div>
          <div className="comment-date">
            {data.createdAt.toLocaleTimeString()}
          </div>
        </div>

        <div className="comment-reply-button">
          <button type="button">삭제</button>
          <button type="button">수정</button>
        </div>
      </div>
      <div className="comment-item-user_text">
        <div>{data.contents}</div>
      </div>
    </React.Fragment>
  );
}

function MyCommentItem({ data }: { data: PostComment }) {
  const [onReplyCommentForm, setOnReplyCommentForm] = useState<boolean>(false);
  const toggleReplyCommentForm = () => {
    setOnReplyCommentForm((v) => {
      return !v;
    });
  };

  return (
    <PostCommentItem>
      <MyCommentView
        data={data}
        toggle={toggleReplyCommentForm}
      ></MyCommentView>

      <PostCommentReply>
        {onReplyCommentForm && <MyReplyCommentForm></MyReplyCommentForm>}
        <MyReplyCommentList data={data.children || []}></MyReplyCommentList>
      </PostCommentReply>
    </PostCommentItem>
  );
}

function MyReplyCommentList({ data }: { data: PostComment[] }) {
  console.log(data);
  return (
    <ul className="comment-reply-list">
      {data.map((d) => {
        return (
          <li>
            <MyReplyCommentView data={d}></MyReplyCommentView>
          </li>
        );
      })}
    </ul>
  );
}

function MyCommentList({ data }: { data: PostComment[] }) {
  return (
    <PostCommentList>
      <ul>
        {data.map((d) => {
          return <MyCommentItem data={d}></MyCommentItem>;
        })}
        {/* <MyCommentItem data={{} as PostComment}></MyCommentItem>
        <PostCommentItem>
          <div className="comment-item-user">
            <div className="comment-item-head">
              <div>
                <div className="comment-user-profile"></div>
                <div className="comment-user-name">닉네임</div>
                <div className="comment-date">1일전</div>
              </div>

              <div className="comment-reply-button">답글달기</div>
            </div>
            <div className="comment-item-user_text">댓글내용</div>
          </div>
        </PostCommentItem> */}
      </ul>
    </PostCommentList>
  );
}

function MyComment({ data }: { data: PostComment[] }) {
  useEffect(() => {}, []);
  return (
    <PostComment>
      <MyCommentForm></MyCommentForm>
      <MyCommentList data={data}></MyCommentList>
    </PostComment>
  );
}

const PostCommentList = styled.div`
  margin-top: 20px;
`;

const PostCommentItem = styled.li`
  margin-top: 20px;

  .comment-item-user {
    display: flex;
    flex-direction: column;
  }

  .comment-item-head {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border-primary);
    padding: 10px 0;
    align-items: center;
  }

  .comment-item-head > div:first-child {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .comment-user-profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ddd;
  }

  .comment-date {
    font-size: 14px;
    color: var(--color-text-tertiary);
  }

  .comment-item-user_text {
    padding: 10px 0;
    color: var(--color-text-tertiary);
    margin-bottom: 40px;
  }

  .comment-user-name {
    font-weight: 600;
  }

  .comment-reply-button {
    font-size: 14px;
    color: var(--color-primary-accent);
  }
`;

const PostCommentReply = styled.div`
  padding-left: 40px;
  display: flex;
  flex-direction: column;

  .comment-reply-list {
    margin-top: 20px;
  }

  .comment-reply-textarea {
    display: flex;
  }

  .comment-user-profile {
    margin-right: 10px;
  }

  .comment-textarea {
    flex: 1;
  }

  .comment-reply-button {
    display: flex;
    gap: 10px;
  }

  .comment-reply-button button {
    border: none;
    background: none;
    font-weight: 500;
  }
`;

const BackButton = styled.span`
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

  .comment-head {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .comment-textarea {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .comment-submit {
    padding: 10px;
    border: none;
    color: var(--color-text-white);
    background-color: var(--color-primary-accent);
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    width: 80px;
    margin-top: 10px;
  }
`;

const CommentTextarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
`;
