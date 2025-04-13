'use client';

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
          <div className="comment-head">댓글</div>
          <div className="comment-textarea">
            <CommentTextarea placeholder="PostComment"></CommentTextarea>
            <button className="comment-submit" type="button">
              등록
            </button>
          </div>
          <PostCommentList>
            <ul>
              <PostCommentItem>
                <div className="comment-item-user">
                  <div className="comment-item-head">
                    <div>
                      <div className="comment-user-profile"></div>
                      <div className="comment-user-name">댓글작성자1</div>
                      <div className="comment-date">1일전</div>
                    </div>

                    <div className="comment-reply-button">답글달기</div>
                  </div>
                  <div className="comment-item-user_text">댓글내용</div>
                </div>

                <PostCommentReply>
                  <div className="comment-reply-textarea">
                    <div className="comment-user-profile"></div>
                    <div className="comment-textarea">
                      <CommentTextarea placeholder="PostComment"></CommentTextarea>
                      <button className="comment-submit" type="button">
                        등록
                      </button>
                    </div>
                  </div>

                  <ul className="comment-reply-list">
                    <li>
                      <div className="comment-item-head">
                        <div>
                          <div className="comment-user-profile"></div>
                          <div className="comment-user-name">답댓작성자</div>
                          <div className="comment-date">1일전</div>
                        </div>

                        <div className="comment-reply-button">
                          <button type="button">삭제</button>
                          <button type="button">수정</button>
                        </div>
                      </div>
                      <div className="comment-item-user_text">
                        <div>답댓글내용</div>
                      </div>
                    </li>
                  </ul>
                </PostCommentReply>
              </PostCommentItem>
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
              </PostCommentItem>
            </ul>
          </PostCommentList>
        </PostComment>
      </PostLayout>
    </div>
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
