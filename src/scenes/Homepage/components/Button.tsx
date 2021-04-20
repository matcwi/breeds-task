import * as React from "react";
import Button from "@material-ui/core/Button";
import { DropdownButton } from "./DropdownButton";
import { IBreed } from "./App";

interface IProps {
  item: IBreed;
  configurePath: (passedBreed: string, passedSubBreed?: string) => void
}

const BreedButton: React.FunctionComponent<IProps> = ({item, configurePath}) => {
  const fetchRandomImgByBreed = () => {
    if (item.subBreed) {
      configurePath(item.breed, item.subBreed[0]);
    } else configurePath(item.breed);
  };

  return (
    <>
      {item.subBreed ? (
        <DropdownButton
          fetchRandomImgByBreed={fetchRandomImgByBreed}
          subBreed={item.subBreed}
        >
          {item.breed}
        </DropdownButton>
      ) : (
        <Button
          style={{ margin: "20px" }}
          variant="outlined"
          color="primary"
          onClick={fetchRandomImgByBreed}
        >
          {item.breed}
        </Button>
      )}
    </>
  );
};

export default BreedButton;
