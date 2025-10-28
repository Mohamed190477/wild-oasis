import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useAddCabin() {
  const queryClient = useQueryClient();
  const { isPending: isAdding, mutate: addCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => addEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin was successfully added!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isAdding, addCabin };
}
