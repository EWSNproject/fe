import { useState } from 'react';

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
          <div className="absolute z-10 px-2 py-1 mt-1 text-sm -translate-x-1/2 rounded-lg shadow-lg left-1/2 top-full w-max bg-black-50 whitespace-nowrap">
            {content}
          </div>
        )}
      </span>
    );
  };
  
export default Tooltip;
