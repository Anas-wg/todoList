import BaseButton from "../common/BaseButton";
import WarningIcon from "../common/icons/WarningIcon";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}
// 삭제 확인 모달 컴포넌트
const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
}: ConfirmationModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/30 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-card px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-card sm:mx-0 sm:h-10 sm:w-10">
                <WarningIcon className="h-6 w-6 text-fg" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-base font-semibold leading-6 text-fg"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-fg">{message}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 flex gap-3 justify-center">
              <BaseButton
                type="button"
                variant="z-secondary"
                size="S"
                onClick={onClose}
              >
                취소
              </BaseButton>
              <BaseButton
                type="button"
                variant="z-primary"
                size="S"
                onClick={onConfirm}
              >
                삭제
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
