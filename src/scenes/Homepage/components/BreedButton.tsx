import * as React from "react";
import Button from "@material-ui/core/Button";
import DropdownContainer  from "./DropdownContainer";
import { IBreed } from "./App";

interface IProps {
  item: IBreed;
  configurePath: (passedBreed: string, passedSubBreed?: string) => void
}

const BreedButton: React.FunctionComponent<IProps> = ({item, configurePath}) => {
  const onButtonClick = () => {
    if (item.subBreed) {
      configurePath(item.breed, item.subBreed[0]);
    } else configurePath(item.breed);
  };

  return (
    <>
      {item.subBreed ? (
        <DropdownContainer
          onButtonClick={onButtonClick}
          subBreed={item.subBreed}
        >
          {item.breed}
        </DropdownContainer>
      ) : (
        <Button
          style={{ margin: "20px" }}
          variant="outlined"
          color="primary"
          onClick={onButtonClick}
        >
          {item.breed}
        </Button>
      )}
    </>
  );
};

export default BreedButton;
