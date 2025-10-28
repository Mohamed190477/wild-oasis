import { useSuspenseQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '../../services/apiAuth';

export default function useGetUser() {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user'],
    queryFn: () => getAuthenticatedUser(),
  });

  return { user };
}
