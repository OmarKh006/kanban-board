import { useContext, useState } from "react";
import DropdownPrimitive from "./DropdownPrimitive";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import DialogPrimitive from "./DialogPrimitive";
import { DataContext } from "@/DataContext";
import NewBoardForm from "./NewBoardForm";

/**
 * @returns {JSX.Element} A React component that renders the header of the application, including the title and a dropdown menu for editing or deleting the current board.
 */

const Header = () => {
  const [open, setOpen] = useState(false);
  const { data, setData, selectedBoardIndex } = useContext(DataContext);

  const onEditBoard = () => setOpen(true);

  const onDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board ??")) {
      setData((prev) => prev.toSpliced(selectedBoardIndex, 1));
    }
  };

  return (
    <header className="flex h-24.25 shrink-0 items-center">
      <div className="border-lines-light flex w-75 items-center gap-4 self-stretch border-r border-b pl-8 text-[32px] font-bold">
        Kanban
      </div>
      <div className="border-lines-light flex flex-1 items-center justify-between self-stretch border-b pr-6 pl-6">
        <h2 className="text-heading-xl">Platform Launch</h2>
        <DropdownPrimitive
          items={{
            edit: { label: "Edit Board", onClick: onEditBoard },
            delete: {
              label: "Delete Board",
              onClick: onDeleteBoard,
            },
          }}
          triggerComponent={() => (
            <button className="text-main-purple flex items-center gap-2 text-[14px] font-bold">
              <img src={iconVerticalEllipsis} alt="icon vertical ellipsis" />
            </button>
          )}
        />
        <DialogPrimitive isOpen={open} setOpen={setOpen} title="Edit Board">
          <NewBoardForm
            toggleDialogue={setOpen}
            boardId={data[selectedBoardIndex]?.id}
            columns={data[selectedBoardIndex]?.columns}
            title={data[selectedBoardIndex]?.title}
          />
        </DialogPrimitive>
      </div>
    </header>
  );
};

export default Header;
