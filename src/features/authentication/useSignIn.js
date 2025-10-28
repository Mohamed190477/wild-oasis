import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { signIn as signInApi } from '../../services/apiAuth';

export default function useSignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ email, password }) => signInApi({ email, password }),
    onSuccess: (user) => {
      toast.success('Successfully signed in!');
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signIn, isPending };
}
