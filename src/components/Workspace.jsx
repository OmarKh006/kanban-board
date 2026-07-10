import { useContext } from "react";
import Column from "./Column";
import { DataContext } from "@/DataContext";

const Workspace = () => {
  const { data, selectedBoardIndex } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;
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
      <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 self-start rounded-md p-3">
        + New Column
      </button>
    </div>
  );
};

export default Workspace;
