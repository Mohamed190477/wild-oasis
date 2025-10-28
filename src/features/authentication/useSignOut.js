import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut as signOutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      toast.success('Successfully signed out!');
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signOut, isPending };
}
