import { Navigate } from 'react-router-dom';

import useGetUser from '../features/authentication/useGetUser';
// import styled from 'styled-components';

// const FullPage = styled.div`
//   height: 100vh;
//   background-color: var(--color-grey-50);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export default function ProtectedRoute({ children }) {
  const { user } = useGetUser();

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
