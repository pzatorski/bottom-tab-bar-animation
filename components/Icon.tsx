import React, { ForwardedRef, forwardRef } from 'react';
import {
  CreditCard,
  Home,
  InformationCircle,
  ReceiptPercent,
  UserCircle,
  ViewfinderCircle,
} from '@nandorojo/heroicons/24/outline';

export type IconName =
  | 'home'
  | 'credit-card'
  | 'receipt-percent'
  | 'user-circle'
  | 'viewfinder-circle'
  | 'information-circle';

type IconProps = {
  name: IconName;
  size: number;
  color?: string;
};

function Icon(props: IconProps, _ref: ForwardedRef<JSX.Element>) {
  const { name, size, color = '#A6A6A6' } = props;
  if (name === 'home') {
    return <Home height={size} width={size} color={color} />;
  }

  if (name === 'credit-card') {
    return <CreditCard height={size} width={size} color={color} />;
  }

  if (name === 'receipt-percent') {
    return (
      <ReceiptPercent height={size} width={size} color={color} />
    );
  }

  if (name === 'user-circle') {
    return <UserCircle height={size} width={size} color={color} />;
  }

  if (name === 'viewfinder-circle') {
    return (
      <ViewfinderCircle height={size} width={size} color={color} />
    );
  }

  if (name === 'information-circle') {
    return (
      <InformationCircle height={size} width={size} color={color} />
    );
  }

  return null;
}

export default forwardRef(Icon);
