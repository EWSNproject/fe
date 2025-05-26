import React from 'react';
import { createPortal } from 'react-dom';

export default function DuplicateModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900 bg-opacity-80">
      <div className="bg-black-50 flex flex-col min-w-[500px] md:min-w-[200px] md:w-[90%] min-h-[210px] p-6 rounded-[8px] z-50">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[18px] md:text-[16px] text-center mt-8">{message}</p>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-[10px] py-[10px] w-[108px] bg-yellow-700 text-black-50 rounded-lg hover:bg-yellow-500">
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
