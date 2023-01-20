import React from 'react';
import styles from './commonButton.module.scss';

interface CommonButtonProps {
  children: React.ReactNode
  onClick: (event:React.MouseEvent<HTMLButtonElement>) => void
  isBlocked: boolean
}

function ProductCartButton({ children, onClick, isBlocked }: CommonButtonProps) {
  return (
    <button disabled={isBlocked} type="button" onClick={onClick} className={styles.commonButton}>
      {children}
    </button>
  );
}

export default ProductCartButton;
