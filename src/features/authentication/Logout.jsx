import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import useSignOut from './useSignOut';
import SpinnerMini from '../../ui/SpinnerMini';

export default function Logout() {
  const { signOut, isPending } = useSignOut();

  return (
    <ButtonIcon onClick={signOut} disabled={isPending}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
