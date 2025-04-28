'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import LoginFilterPopup from '@/components/auth/LoginFilterPopup';
import LoginFilter from '@/components/auth/LoginFilter';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import constructWithOptions from 'styled-components/dist/constructors/constructWithOptions';
import { current } from '@reduxjs/toolkit';

// posts: {
//   id: number;
//   title: string;
//   author: string;
//   date: string;
//   category: string;
//   content: string;
// }
interface MyPostData {
  id: string;
  title: string;
  author: string;
  userId: string;
  category: string;
  content: string;
  createdAt: Date;
  comments: MyPostComment[];
}
interface MyPostComment {
  id: string;
  userId: string;
  author: string;
  content: string;
  postId: string;
  parentId?: string;
  createdAt: Date;
  children?: MyPostComment[];
}

interface MyCommentForm {
  content: string;
  userId: string;
  postId: string;
  parentId: string;
}

export default function Post() {
  const router = useRouter();
  const [myPostData, setMyPostData] = useState<MyPostData>();

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  const commentListLenght = (commentList: MyPostComment[]) => {
    return commentList.reduce((d, c) => {
      return d + (c.children ? c.children.length : 0) + 1;
    }, 0);
  };

  useEffect(() => {
    const testData: MyPostData = {
      id: '123',
      author: 'Hello',
      userId: 'world',
      title: 'hello',
      category: 'cate1',
      content: '<p>hello world~</p><p>hello world</p>',
      createdAt: new Date(),
      comments: [
        {
          id: '321123123',
          author: 'Hello',
          userId: 'world',
          content: 'u jam',
          createdAt: new Date(),
          postId: '123',
          children: [
            {
              id: '4321',
              author: 'Hello',
              userId: 'world',
              content: 'no jam',
              createdAt: new Date(),
              postId: '123',
            } as MyPostComment,
          ],
        } as MyPostComment,
        {
          id: '321',
          author: 'Hello',
          userId: 'world',
          content: 'u jam',
          createdAt: new Date(),
          postId: '123',
          children: [
            {
              id: '4321',
              author: 'Hello',
              userId: 'world',
              content: 'no jam',
              createdAt: new Date(),
              postId: '123',
            } as MyPostComment,
            ...Array.from({ length: 10 }, (v, i) => {
              return {
                id: '4321' + i,
                author: 'Hello',
                userId: 'world',
                content: 'no jam',
                createdAt: new Date(),
                postId: '123',
              };
            }),
          ],
        } as MyPostComment,
        ...Array.from({ length: 23 }, (v, i) => {
          return {
            id: '4321555' + i,
            author: 'Hello',
            userId: 'world',
            content: 'no jam',
            createdAt: new Date(),
            postId: '123',
          };
        }),
      ],
    };
    setMyPostData(testData);
  }, []);
  if (!myPostData) {
    return <div></div>;
  }
  return (
    <div>
      <BackButton onClick={handleGoBack}>← Go Back</BackButton>
      <PostLayout>
        <PostHeader>
          <div>
            <p className="post-item_name">{myPostData.title}</p>
            <div className="post-item_info">
              <span className="post-item_author">{myPostData.author}</span>
              <span className="post-item_date">
                {myPostData.createdAt.toLocaleString()}
              </span>
              <div className="post-item_comment">
                <i></i> {commentListLenght(myPostData.comments)}
              </div>
            </div>
          </div>
          <div className="post-item_pohto"></div>
        </PostHeader>
        <PostText>{myPostData.content}</PostText>
        {/*  */}
        <MyComment data={myPostData.comments}></MyComment>
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
  } = useForm<MyCommentForm>();
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
            {...register('content', {
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
              {(getValues('content')
                ? getValues('content').length.toString()
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
  } = useForm<MyCommentForm>();
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
            {...register('content', {
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
              {(getValues('content')
                ? getValues('content').length.toString()
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

function MyCommentView({ data, toggle }: { data: MyPostComment; toggle: any }) {
  return (
    <div className="comment-item-user">
      <div className="comment-item-head">
        <div>
          <div className="comment-user-profile"></div>
          <div className="comment-user-name">{data.author}</div>
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
      <div className="comment-item-user_text">{data.content}</div>
    </div>
  );
}

function MyReplyCommentView({ data }: { data: MyPostComment }) {
  return (
    <React.Fragment>
      <div className="comment-item-head">
        <div>
          <div className="comment-user-profile"></div>
          <div className="comment-user-name">{data.author}</div>
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
        <div>{data.content}</div>
      </div>
    </React.Fragment>
  );
}

function MyCommentItem({ data }: { data: MyPostComment }) {
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

function MyReplyCommentList({ data }: { data: MyPostComment[] }) {
  const cut = 5;
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(data.length);
  }, [data]);

  useEffect(() => {}, [page]);
  return (
    <React.Fragment>
      <ul className="comment-reply-list">
        {data.map((d, i) => {
          if (i < page * cut) {
            return (
              <li key={'post-comment' + d.id}>
                <MyReplyCommentView data={d}></MyReplyCommentView>
              </li>
            );
          }
        })}
      </ul>

      {count > cut * page && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span
            onClick={() => {
              setPage((v) => {
                return v + 1;
              });
            }}
            style={{}}
          >
            더 보기
          </span>
        </div>
      )}
    </React.Fragment>
  );
}

function MyCommentList({ data }: { data: MyPostComment[] }) {
  interface MyPostComment2 extends MyPostComment {
    page: number;
  }
  const cut = 10;
  const cut2 = 5;
  const [maxPage, setMaxPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [myData, setMyData] = useState<MyPostComment2[]>();

  const commentCounter = (mypostCommnet: MyPostComment) => {
    return (
      1 +
      (mypostCommnet.children
        ? mypostCommnet.children.length < cut2
          ? mypostCommnet.children.length
          : cut2
        : 0)
    );
  };

  const pageUI = (currentPage: number, maxPage: number) => {
    const minPage = 1;
    const cut = 10;
    const offset = cut * Math.floor((currentPage - 1) / cut);

    return [
      <div
        key={offset - 1}
        onClick={() => {
          setPage((v) => {
            return v <= minPage ? minPage : v - 1;
          });
        }}
        style={{
          margin: '0px 3px 0px 3px',
        }}
      >
        P
      </div>,
      ...Array.from(
        {
          length: maxPage - offset > cut ? cut : maxPage - offset,
        },
        (v, i) => {
          return (
            <div
              key={i + 1 + offset}
              onClick={() => {
                setPage(i + 1 + offset);
              }}
              style={{
                fontWeight: i + 1 + offset === currentPage ? 'bold' : '',
                margin: '0px 3px 0px 3px',
              }}
            >
              {i + 1 + offset}
            </div>
          );
        },
      ),
      <div
        key={maxPage + offset + 1}
        onClick={() => {
          setPage((v) => {
            return v >= maxPage ? maxPage : v + 1;
          });
        }}
        style={{
          margin: '0px 3px 0px 3px',
        }}
      >
        N
      </div>,
    ];
  };

  useEffect(() => {
    let count = 0;
    let currentPage = 1;
    setMyData(
      data.map((d, i) => {
        if (count >= cut) {
          count = 0;
          currentPage = currentPage + 1;
          setMaxPage(currentPage);
        }

        const myPostComment: MyPostComment2 = {
          ...d,
          page: currentPage,
        };

        count = count + commentCounter(d);
        return myPostComment;
      }),
    );
  }, [data]);
  return (
    <PostCommentList>
      <ul>
        {myData &&
          myData.map((d) => {
            if (d.page === page) {
              return (
                <MyCommentItem
                  data={d}
                  key={'post-comment' + d.id}
                ></MyCommentItem>
              );
            }
          })}
      </ul>
      {myData && (
        <div
          style={{
            marginTop: '55px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            {pageUI(page, maxPage)}
          </span>
        </div>
      )}
    </PostCommentList>
  );
}

function MyComment({ data }: { data: MyPostComment[] }) {
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
