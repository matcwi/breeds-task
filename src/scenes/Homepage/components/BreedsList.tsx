import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL } from "../../../constants";
import { IBreed } from "./App";
import BreedButton from "./BreedButton";
import { ModalContent } from "./ModalContent";
import AOS from "aos";
import "aos/dist/aos.css";
import "./BreedsList.css";
interface IProps {
  breeds: IBreed[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const BreedsList: FunctionComponent<IProps> = ({
  breeds,
  setIsLoading,
  setError,
  isLoading,
}) => {
  const [path, setPath] = React.useState<string>("");
  const [modalImage, setModalImage] = React.useState<string>("");
  const [isModalOpen, setOpen] = React.useState<boolean>(false);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetch(path).then((res) => res.json());
      if (data.status === "success") setModalImage(data.message);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [path, setIsLoading, setModalImage, setError]);

  const configurePath = (passedBreed: string, passedSubBreed?: string) => {
    if (passedBreed) {
      if (passedSubBreed)
        setPath(`${BASE_URL}${passedBreed}/${passedSubBreed}/images/random`);
      else setPath(`${BASE_URL}${passedBreed}/images/random`);
    }
    setOpen(true);
  };

  useEffect(() => {
    if (path) sendRequest();
  }, [path, sendRequest]);

  useEffect(() => {
    AOS.init();
  }, []);

  const onCloseModal = () => {
    setOpen(false);
    setModalImage("");
    setPath("");
  };

  return (
    <>
      {breeds.map((item: IBreed, index: number) => (
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay={index * 10}
          data-aos-duration="1000"
          style={{ zIndex: "auto" }}
          className="aos-fix"
          key={item.id}
        >
          <BreedButton
            item={item}
            configurePath={configurePath}
          />
        </div>
      ))}
      <ModalContent
        isModalOpen={isModalOpen}
        modalImage={modalImage}
        isLoading={isLoading}
        sendRequest={sendRequest}
        onCloseModal={onCloseModal}
      />
    </>
  );
};

export default BreedsList;
