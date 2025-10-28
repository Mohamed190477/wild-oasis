import { useEffect, useRef } from 'react';

export default function useCloseModal(close, exceptionalId = '') {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          if (exceptionalId !== '' && e.target.id === exceptionalId) {
            return;
          }
          console.log(exceptionalId);
          close();
        }
      }
      document.addEventListener('click', handleClick, true);
      return () => document.removeEventListener('click', handleClick, true);
    },
    [close, exceptionalId]
  );

  return ref;
}
