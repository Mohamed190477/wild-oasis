import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '../../services/apiBookings';

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    // on success receives the data from the mutation function
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} checked out successfully`);
      // invlidate all queries that are active (being used right now)
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong, please try again'
      );
    },
  });

  return { checkout, isCheckingOut };
}
