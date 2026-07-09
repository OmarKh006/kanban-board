import clsx from "clsx";
import { useState } from "react";
import DialogPrimitive from "./DialogPrimitive";
import iconBoard from "@assets/icon-board.svg";

/**
 *
 * @param {Object} props
 * @param {Array} props.data - An array of board objects, each containing an id and title.
 * @param {number} props.selectedBoardIndex - The index of the currently selected board.
 * @param {Function} props.setSelectedBoardIndex - A function to update the selected board index.
 * @returns {JSX.Element} A React component that renders a side menu with a list of boards and a button to create a new board.
 */

const SideMenu = ({ data = [], selectedBoardIndex, setSelectedBoardIndex }) => {
  const [open, setOpen] = useState(false);
  return (
    <aside className="side-menu border-lines-light -mt-px w-75 border-r bg-white">
      <p className="text-heading-s px-8 py-4">All Boards ({data.length})</p>
      <ul>
        {data.map((item, index) => {
          return (
            <li key={item.id}>
              <button
                data-isactive={selectedBoardIndex === index}
                className={clsx(
                  "text-heading-m text-medium-grey data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple flex w-11/12 items-center gap-4 rounded-e-full px-8 py-4 transition",
                  {
                    "bg-main-purple hover:bg-main-purple text-white!":
                      selectedBoardIndex === index,
                  },
                )}
                onClick={() => setSelectedBoardIndex(index)}
              >
                <img src={iconBoard} alt="" /> {item.title}
              </button>
            </li>
          );
        })}
        <li className="px-8 py-4">
          <DialogPrimitive
            isOpen={open}
            setOpen={setOpen}
            title="Create New Board"
            triggerComponent={
              <button className="text-heading-m text-main-purple flex w-full items-center gap-4">
                <img src={iconBoard} alt="" /> + Create New Board
              </button>
            }
          >
            Hello
          </DialogPrimitive>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
