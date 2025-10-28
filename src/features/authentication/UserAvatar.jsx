import styled from 'styled-components';
import useGetUser from './useGetUser';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
  const { user } = useGetUser();
  const {
    user_metadata: { fullName, avatar },
  } = user;

  return (
    <StyledUserAvatar>
      <Avatar
        src={
          avatar
            ? avatar
            : 'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE1hbnxlbnwwfHwwfHx8MA%3D%3D'
        }
        alt={fullName}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}
