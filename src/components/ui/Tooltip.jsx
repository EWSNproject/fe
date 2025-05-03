import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    if (!content) {
      return <span className="inline-flex items-center align-middle">{children}</span>;
    }
  
    return (
      <span
        className="relative inline-flex items-center align-middle"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-10 w-max px-2 py-1 text-sm bg-black-50 rounded-lg shadow-lg whitespace-nowrap">
            {content}
          </div>
        )}
      </span>
    );
  };
  
  
  

export default Tooltip;
