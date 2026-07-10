import { useContext } from "react";
import Card from "./Card";
import { DataContext } from "@/DataContext";
import { produce } from "immer";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Column = ({ id, tasks = [], title }) => {
  const { selectedBoardIndex, data, setData } = useContext(DataContext);

  const { setNodeRef } = useDroppable({
    id: `column-${id}`,
    data: { columnId: id, type: "column" },
  });

  const createNewTaskObject = () => ({ id: Date.now(), title: "New Task" });

  const createNewColumnArray = (dataArray, boardIndex, newTask) => {
    return dataArray[boardIndex].columns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          tasks: [...column.tasks, newTask],
        };
      }
      return column;
    });
  };

  const addNewTaskHandler = () => {
    const newTask = createNewTaskObject();
    const newColumns = createNewColumnArray(data, selectedBoardIndex, newTask);
    setData((prev) => {
      const newData = [...prev];
      newData[selectedBoardIndex] = {
        ...newData[selectedBoardIndex],
        columns: newColumns,
      };
      return newData;
    });
  };

  const deleteColumnHandler = () => {
    if (window.confirm(`Are you sure you want to delete this "${title}"?`)) {
      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = draft[
            selectedBoardIndex
          ].columns.filter((column) => column.id !== id);
        }),
      );
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-lines-light flex w-72 shrink-0 flex-col self-start rounded-lg px-2 shadow"
    >
      <h2 className="group/column bg-lines-light text-heading-s relative top-0 rounded px-2 py-4">
        {title} ({tasks.length})
        <button
          className="text-body-m text-red absolute top-0 right-0 bottom-0 p-2 opacity-0 duration-300 group-hover/column:opacity-100 focus:opacity-100"
          onClick={deleteColumnHandler}
        >
          Delete
        </button>
      </h2>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="mb-5 flex flex-col gap-5">
          {tasks.map((task) => (
            <Card
              key={task.id}
              title={task.title}
              cardId={task.id}
              columnId={id}
            />
          ))}
        </div>
      </SortableContext>
      <button
        className="border-light-grey bg-lines-light text-heading-m text-medium-grey -mx-2 mt-auto border-t px-2 py-4"
        onClick={addNewTaskHandler}
      >
        + Add New Task
      </button>
    </div>
  );
};

export default Column;
