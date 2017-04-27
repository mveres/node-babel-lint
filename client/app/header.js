import React from 'react';
import { arrowRight, arrowDown } from './icons';

export default props => {
  const { open, text } = props;
  return (
    <div className="collapsible-header">
      { open ? arrowDown() : arrowRight() }
      <span>{ text }</span>
    </div>
  );
};
