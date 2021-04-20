import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export const DropdownButtonContent: React.FunctionComponent<any> = (
  props: any
) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        style={{ margin: "20px" }}
        ref={props.anchorRef}
        aria-controls={props.open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={props.handleToggle}
        variant="outlined"
        color="primary"
        endIcon={<ArrowDropDownIcon />}
      >
        {props.children}
      </Button>
      <Popper
        open={props.open}
        anchorEl={props.anchorRef.current}
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
              <ClickAwayListener onClickAway={props.handleClose}>
                <MenuList autoFocusItem={props.open} id="menu-list-grow">
                  {props.subBreed.map((item: any, index: any) => (
                    <MenuItem key={index} onClick={props.fetchRandomImgByBreed}>
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
