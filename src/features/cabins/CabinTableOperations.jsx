import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

const options = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'with-discount',
    label: 'With discount',
  },
  {
    value: 'no-dicount',
    label: 'Without discount',
  },
];

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField={'discount'} options={options} />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name from (A-Z)' },
          { value: 'name-desc', label: 'Sort by name from (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
          { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
          { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
          { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
        ]}
      />
    </TableOperations>
  );
}
