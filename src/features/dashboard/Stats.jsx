import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  numCabins,
}) {
  const numberOfBookings = bookings ? bookings.length : 0;
  const sales = bookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0
  );
  const checkins = confirmedStays ? confirmedStays.length : 0;
  const occupation =
    (
      (confirmedStays.reduce((total, stay) => total + stay.numNights, 0) /
        (numCabins * numDays)) *
      100
    ).toFixed(2) + '%';

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numberOfBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupation}
      />
    </>
  );
}
