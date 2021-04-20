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
  onButtonClick: () => void;
  handleClose: (event: any) => void;
  subBreed: string[];
  children: string;
}

export const DropdownButtonContent: React.FunctionComponent<IProps> = ({
  anchorRef,
  open,
  handleToggle,
  onButtonClick,
  handleClose,
  children,
  subBreed,
}) => {
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
        style={{ zIndex: 2 }}
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
                  {subBreed.map((item: any, index: any) => (
                    <MenuItem key={index} onClick={onButtonClick}>
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
