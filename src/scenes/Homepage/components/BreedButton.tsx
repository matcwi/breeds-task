import * as React from "react";
import Button from "@material-ui/core/Button";
import DropdownContainer from "./DropdownContainer";
import { IBreed } from "./App";

interface IProps {
  item: IBreed;
  configurePath: (passedBreed: string, passedSubBreed?: string) => void;
}

const BreedButton: React.FunctionComponent<IProps> = ({
  item,
  configurePath,
}) => {
  const onDropdownBtnClick = (subBreadName: string) => {
    configurePath(item.breed, subBreadName);
  };

  const onSimpleBtnClick = () => {
    configurePath(item.breed);
  };

  return (
    <>
      {item.subBreed ? (
        <DropdownContainer
          onButtonClick={onDropdownBtnClick}
          subBreed={item.subBreed}
        >
          {item.breed}
        </DropdownContainer>
      ) : (
        <Button
          style={{ margin: "20px" }}
          variant="outlined"
          color="primary"
          onClick={onSimpleBtnClick}
        >
          {item.breed}
        </Button>
      )}
    </>
  );
};

export default BreedButton;
