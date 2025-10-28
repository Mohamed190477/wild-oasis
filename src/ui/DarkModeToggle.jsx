import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { useDarkMode } from '../contexts/darkModeContext';
import ButtonIcon from './ButtonIcon';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
