import { ReactElement, useCallback, useState } from "react";
import { Box, Modal } from "@mui/material";

export const useModal = (isBlur: boolean = true) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalStyles = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: "8px"
  };

  const ModalComponent = useCallback(
    ({ children }: { children: ReactElement }) => (
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={modalStyles}>{children}</Box>
      </Modal>
    ),
    [isOpen, isBlur]
  );

  return {
    Modal: ModalComponent,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  };
};
