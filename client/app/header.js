import React from 'react';

export default props => {
  const { open, text } = props;
  const glyph = open ? 'fa fa-angle-down' : 'fa fa-angle-right';
  return (
    <div className="collapsible-header">
      <span className="collapsible-header-glyph">
        <span className={ glyph } />
      </span>
      <span>{ text }</span>
    </div>
  );
};
