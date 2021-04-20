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

  return (
    <>
      {breeds.map((item: IBreed) => (
        <BreedButton key={item.id} item={item} configurePath={configurePath} />
      ))}
      <ModalContent
        isModalOpen={isModalOpen}
        modalImage={modalImage}
        isLoading={isLoading}
        setOpen={setOpen}
        setModalImage={setModalImage}
        sendRequest={sendRequest}
      />
    </>
  );
};

export default BreedsList;