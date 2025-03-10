import React from 'react';
import classnames from 'classnames';

function Panel({ children, className, ...rest }) {
  const finalClassNames = classnames('border rounded p-3 shadow bg-white w-full', className);
  return <div {...rest} className={finalClassNames}>{children}</div>;
}

export default Panel;
