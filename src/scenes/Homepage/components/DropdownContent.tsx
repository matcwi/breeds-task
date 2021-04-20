import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

interface IProps {
  anchorRef: React.MutableRefObject<any>;
  open: boolean;
  handleToggle: () => void;
  onButtonClick: (subBreadName: string) => void;
  handleClose: (event: any) => void;
  subBreed: string[];
  children: string;
}

export const DropdownContent: React.FunctionComponent<IProps> = ({
  anchorRef,
  open,
  handleToggle,
  onButtonClick,
  handleClose,
  children,
  subBreed,
}) => {
  const handleMenuItemClick = (subBreedName: string) => {
    onButtonClick(subBreedName);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        style={{ margin: "20px" }}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="outlined"
        color="primary"
        endIcon={<ArrowDropDownIcon />}
      >
        {children}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 4 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  {subBreed.map((item: string, index: number) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleMenuItemClick(item)}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
