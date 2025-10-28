import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export default function useGetBookingDetails() {
  const { id } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id),
  });

  return { isLoading, booking, error };
}
