'use client';

import styled from 'styled-components';

export default function UserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return (
    <div className="content">
      <div className="content-inner">
        <UserWrap>
          <UserProfile>
            <div className="user-img">
              <img
                src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=500&h=500&q=80"
                alt={userId}
              ></img>
            </div>
            <p className="user-id">{userId}</p>
            <p className="user-email">유저이메일@naver.com</p>
          </UserProfile>

          <UserClender>
            <Title>캘린더</Title>
          </UserClender>

          <UserArchive>
            <Title>보관함</Title>
          </UserArchive>
        </UserWrap>
      </div>
    </div>
  );
}

const UserWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const UserProfile = styled.section`
  width: 100%;

  .user-img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 16px;

    img {
      width: 100%;
    }
  }

  .user-id {
    font-size: 20px;
    margin-bottom: 4px;
    font-weight: 600;
  }

  .user-email {
    font-size: 14px;
    color: var(--color-text-tertiary);
  }
`;

const UserClender = styled.section`
  width: 100&;
`;

const UserArchive = styled.section`
  width: 100&;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
`;
