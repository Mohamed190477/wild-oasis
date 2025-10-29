import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export default function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || '7';
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['recent-stays', `last-${numDays}-days`],
  });
  const confirmedStays =
    stays?.filter((stay) => stay.status !== 'unconfirmed') || [];

  return { isLoading, stays, confirmedStays, numDays };
}
