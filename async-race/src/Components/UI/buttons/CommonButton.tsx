import React from 'react';

interface CommonButtonProps {
  children: React.ReactNode
  onClick: (event:React.MouseEvent<HTMLButtonElement>) => void
}

function ProductCartButton({ children, onClick }: CommonButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default ProductCartButton;
