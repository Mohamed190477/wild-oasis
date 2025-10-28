import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignup() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (user) => signUpApi(user),
    onSuccess: () => {
      toast.success(
        "New user was created successfully, please verify the new account from the user's email address"
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signUp, isPending };
}
