import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { updateCurrentUser as updateCurrentUserApi } from '../../services/apiAuth';

export default function useUpdateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateCurrentUserApi({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      toast.success('Successfully update user!');
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isPending };
}
