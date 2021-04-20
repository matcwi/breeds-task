import { Button, CircularProgress } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Modal } from "react-responsive-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ModalContent.css";

interface IProps {
  isModalOpen: boolean;
  modalImage: string;
  isLoading: boolean;
  sendRequest: () => void;
  onCloseModal: () => void;
}

export const ModalContent: FunctionComponent<IProps> = ({
  isModalOpen,
  modalImage,
  isLoading,
  sendRequest,
  onCloseModal,
}) => {
  return (
    <Modal open={isModalOpen} onClose={onCloseModal} center>
      <div className="image-container">
        {isLoading && (
          <CircularProgress
            style={{ position: "absolute", top: "50%", left: "50%", zIndex: 2 }}
          />
        )}
        <LazyLoadImage
          effect="blur"
          src={modalImage}
          width="100%"
          height="100%"
          alt="animal"
        />
      </div>

      <Button variant="contained" color="secondary" onClick={sendRequest}>
        New image
      </Button>
    </Modal>
  );
};
