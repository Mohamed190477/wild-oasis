import styled from 'styled-components';
import useRecentStays from './useRecentStays';
import useRecentBookings from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import useGetBookings from '../bookings/useGetBookings';
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { count, isLoading: isLoadingBookingsCount } = useGetBookings();

  if (isLoadingBookings || isLoadingStays || isLoadingBookingsCount)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={count}
      />
      <div>today's activity</div>
      <div>stay durations</div>
      <SalesChart />
    </StyledDashboardLayout>
  );
}
