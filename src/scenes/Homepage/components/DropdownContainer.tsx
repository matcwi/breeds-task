import React from "react";
import { DropdownButtonContent } from "./DropdownContent";

interface IProps {
  subBreed: string[];
  children: string;
  onButtonClick: () => void;
}

export const DropdownButton: React.FunctionComponent<IProps> = ({subBreed, children, onButtonClick}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  const prevOpen = React.useRef(open);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) anchorRef.current.focus();
    prevOpen.current = open;
  }, [open]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <DropdownButtonContent
        anchorRef={anchorRef}
        open={open}
        handleClose={handleClose}
        handleToggle={handleToggle}
        subBreed={subBreed}
        onButtonClick={onButtonClick}
      >
        {children}
      </DropdownButtonContent>
    </div>
  );
};
