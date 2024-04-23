import React, { FC, Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

const scales = ["sm", "md", "lg"] as const;
const modalTypes = ["info", "warning", "error", "success"] as const;

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  scale?: (typeof scales)[number];
  showCloseIcon?: boolean;
  dismissOnclickOutside?: boolean;
  className?: string;
  type?: (typeof modalTypes)[number];
  title?: ReactNode;
}

const Modal: FC<ModalProps> = ({
  open,
  setOpen,
  children,
  scale = "sm",
  showCloseIcon = true,
  dismissOnclickOutside = true,
  className,
  title,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[10000000]"
        onClose={(state) => (dismissOnclickOutside ? setOpen(state) : void 0)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 relative">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  "relative transform rounded-[20px] bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full ",
                  scale === "sm" && "sm:max-w-sm",
                  scale === "md" && "sm:max-w-md",
                  scale === "lg" && "sm:max-w-lg",
                  className
                )}
              >
                {showCloseIcon && (
                  <div className="absolute z-[677777] top-[12px] right-[10px]">
                    <button
                      className=" text-primary   w-7 h-7 flex items-center justify-center rounded-full"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {title && (
                  <div className="border-b border-gray-50 px-6 py-4">
                    <h3 className="text-[24px] font-[700] leading-6 text-gray-900">
                      {title}
                    </h3>
                  </div>
                )}

                <div className="relative p-6">{children}</div>
                <div className="bg-gray-200"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const useModal = (defaultOpen?: boolean) => {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const ModalComponent = ({
    children,
    ...props
  }: Omit<ModalProps, "open" | "setOpen">) => (
    <Modal open={open} setOpen={setOpen} {...props}>
      {children}
    </Modal>
  );

  return { open, showModal: setOpen, Modal: ModalComponent };
};
