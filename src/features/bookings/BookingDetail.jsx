import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useGetBookingDetails from './useGetBookingDetails';
import useCheckout from '../check-in-out/useCheckout';
import useDeleteBooking from './useDeleteBooking';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useGetBookingDetails();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, id } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}
        {status === 'checked-in' && (
          <Button disabled={isCheckingOut} onClick={() => checkout(id)}>
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open open="confirmBookingDeletionDetail">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="confirmBookingDeletionDetail">
            <ConfirmDelete
              disabled={isDeletingBooking}
              resourceName={'booking'}
              onConfirm={() => {
                deleteBooking(id, {
                  onSuccess: () => {
                    moveBack();
                  },
                });
              }}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
