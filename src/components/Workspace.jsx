import { useContext } from "react";
import Column from "./Column";
import { DataContext } from "@/DataContext";
import { produce } from "immer";

const Workspace = () => {
  const { data, selectedBoardIndex, setData } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;

  const addNewColumnHandler = () => {
    setData((prev) => {
      return produce(prev, (draft) => {
        draft[selectedBoardIndex].columns.push({
          id: Date.now(),
          title: "New Column",
          tasks: [],
        });
      });
    });
  };

  return (
    <div className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
      {columns?.length &&
        columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            tasks={column.tasks}
            title={column.title}
          />
        ))}
      <button
        className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 self-start rounded-md p-3"
        onClick={addNewColumnHandler}
      >
        + New Column
      </button>
    </div>
  );
};

export default Workspace;
