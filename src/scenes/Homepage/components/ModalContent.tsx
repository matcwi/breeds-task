import { Button, CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, SetStateAction, Dispatch } from "react";
import { Modal } from "react-responsive-modal";
import LazyLoad from "react-lazyload";
interface IProps {
  isModalOpen: boolean;
  modalImage: string;
  isLoading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setModalImage: Dispatch<SetStateAction<string>>;
  sendRequest: () => void;
}

export const ModalContent: FunctionComponent<IProps> = ({
  isModalOpen,
  modalImage,
  isLoading,
  setOpen,
  setModalImage,
  sendRequest,
}) => {
  const onCloseModal = () => {
    setOpen(false);
    setModalImage("");
  };
  return (
    <Modal open={isModalOpen} onClose={onCloseModal} center>
      <div className="image-container">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {modalImage && (
              <LazyLoad  height="400px" once>
                <img src={modalImage} width="100%" height="100%" alt="animal" />
              </LazyLoad>
            )}
          </>
        )}
      </div>
      <Button variant="contained" color="secondary" onClick={sendRequest}>
        New image
      </Button>
    </Modal>
  );
};
