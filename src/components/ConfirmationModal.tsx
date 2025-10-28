import React from "react";
import BaseButton from "./common/BaseButton";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

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
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-fg bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-card px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-card sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-fg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.945 3.35h13.71c1.771 0 2.816-1.85 1.945-3.35L13.71 7.108c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-fg" id="modal-title">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-fg">{message}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <BaseButton
                type="button"
                variant="z-primary"
                size="S"
                onClick={onConfirm}
              >
                삭제
              </BaseButton>
              <BaseButton
                type="button"
                variant="z-secondary"
                size="S"
                onClick={onClose}
              >
                취소
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;