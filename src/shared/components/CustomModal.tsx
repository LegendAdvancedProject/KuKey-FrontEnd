import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어둡게
    zIndex: 50,
  },
  content: {
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    background: 'none',
  },
};

type CustomModalProps = {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
};

const CustomModal = ({ content, isOpen, onClose, onConfirm }: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Custom Modal"
    >
      <div className="w-[90vw] max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mb-6">{content}</div>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
