import styled from 'styled-components';
// import { useState } from 'react';
import { HiSquare2Stack, HiPencil, HiTrash } from 'react-icons/hi2';

import CreateCabinForm from './CreateCabinForm';

import useDeleteCabin from './useDeleteCabin';
import { formatCurrency } from '../../utils/helpers';
import useAddCabin from './useAddCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
    id: cabinId,
  } = cabin;

  // const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { addCabin, isAdding } = useAddCabin();

  return (
    <>
      <Table.Row>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : '___'}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />

              <Menus.List id={cabinId}>
                <Menus.Button
                  disabled={isAdding}
                  onClick={() =>
                    addCabin({
                      newCabin: {
                        name: `copy of ${name}`,
                        maxCapacity,
                        regularPrice,
                        discount,
                        image,
                        description,
                      },
                      id: '',
                    })
                  }
                  icon={<HiSquare2Stack />}
                >
                  {isAdding ? 'Duplicating...' : 'Duplicate'}
                </Menus.Button>

                <Modal.Open open="editCabin">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open open="confirmDeletion">
                  <Menus.Button onClick={() => {}} icon={<HiTrash />}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="editCabin">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="confirmDeletion">
                <ConfirmDelete
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                  resourceName="cabin"
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
}
