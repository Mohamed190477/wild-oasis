import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => addEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin was successfully edited!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
}
