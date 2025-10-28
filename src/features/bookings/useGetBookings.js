import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/globalConstants';

export default function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // filter
  const filterStatus = searchParams.get('status');
  const filter =
    !filterStatus || filterStatus === 'all'
      ? null
      : { field: 'status', value: filterStatus, method: 'eq' };

  // sorting
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // pagination
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const {
    isLoading,
    data: { data: bookings, count } = { data: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // pre fetching the next page
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
