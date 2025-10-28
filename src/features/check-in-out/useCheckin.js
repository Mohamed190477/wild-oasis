import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckin } = useMutation({
    mutationFn: ({ bookingId, additionalSettings = {} }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...additionalSettings,
      }),

    // on success receives the data from the mutation function
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} checked in successfully`);
      // invlidate all queries that are active (being used right now)
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong, please try again'
      );
    },
  });

  return { checkin, isCheckin };
}
