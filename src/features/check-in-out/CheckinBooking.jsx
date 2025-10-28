import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useGetBookingDetails from '../bookings/useGetBookingDetails';
import { useParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import useCheckIn from './useCheckin';
import useSettings from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { id } = useParams();
  const { booking, isLoading: isBookingsLoading } = useGetBookingDetails(id);
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const { checkin, isCheckin } = useCheckIn();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isBookingsLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    hasBreakfast,
    numGuests,
    numNights,
    totalPrice,
  } = booking;

  const { breakfastPrice } = settings;
  const totalBreakfastPrice = breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        additionalSettings: {
          hasBreakfast: true,
          extrasPrice: totalBreakfastPrice,
          totalPrice: totalPrice + totalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
            disabled={hasBreakfast}
            id={'add-breakfast'}
          >
            <label htmlFor="add-breakfast">
              Want to add breakfast for {formatCurrency(totalBreakfastPrice)}
            </label>
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={booking.isPaid && !addBreakfast}
          id={'confirm-paid'}
        >
          <label htmlFor="confirm-paid">
            I confirm that {guests.fullName} has paid the total amount of{' '}
            {addBreakfast
              ? formatCurrency(totalPrice + totalBreakfastPrice)
              : formatCurrency(totalPrice)}
          </label>
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
