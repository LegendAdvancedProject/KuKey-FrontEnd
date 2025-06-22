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
  showCancelButton?: boolean;
};

const CustomModal = ({
  content,
  isOpen,
  onClose,
  onConfirm,
  showCancelButton = true,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // ESC, 배경 클릭할 때 호출되는 콜백
      style={customStyles}
      contentLabel="Custom Modal" // 스크린 리더 label
    >
      <div className="flex w-[90vw] max-w-md flex-col items-center rounded-[12px] bg-[#F8F8F8] p-6 text-center shadow-xl">
        <div className="mb-6 text-[15px] font-[600] text-[#454A4D]">{content}</div>

        <div className="flex gap-[10px]">
          {showCancelButton && (
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="w-[60px] rounded-lg bg-gray-400 px-4 py-2 text-[13px] text-white transition"
            >
              취소
            </button>
          )}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-[60px] rounded-lg bg-[#217446] text-[13px] px-4 py-2 text-white transition"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
