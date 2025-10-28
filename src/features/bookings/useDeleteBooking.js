import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success('Booking deleted');
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong, please try again'
      );
    },
  });

  return { isDeletingBooking, deleteBooking };
}
