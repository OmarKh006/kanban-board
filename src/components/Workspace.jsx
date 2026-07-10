import { useContext } from "react";
import Column from "./Column";
import { DataContext } from "@/DataContext";
import { produce } from "immer";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const Workspace = () => {
  const { data, selectedBoardIndex, setData } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

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

  const onDragEndHandler = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const overColumnId = over.data.current.columnId;
    const activeColumnId = active.data.current.columnId;

    if (activeId === overId) return;
    if (!activeColumnId || !overColumnId) return;

    if (activeColumnId === overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === activeColumnId) {
          const activeIdIndex = column.tasks.findIndex(
            (task) => task.id === activeId,
          );
          const overIdIndex = column.tasks.findIndex(
            (task) => task.id === overId,
          );
          if (activeIdIndex === -1 || overIdIndex === -1) return column;
          const tasks = arrayMove(column.tasks, activeIdIndex, overIdIndex);
          return { ...column, tasks };
        }
        return column;
      });

      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = newColumns;
        }),
      );
    }
  };

  const onDragOverHandler = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overColumnId = over.data?.current?.columnId;
    const activeColumnId = active.data?.current?.columnId;

    if (overColumnId && activeColumnId && activeColumnId !== overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === overColumnId) {
          if (column.tasks.some((task) => task.id === activeId)) return column;
          const activeTask = columns
            .find((col) => col.id === activeColumnId)
            ?.tasks.find((task) => task.id === activeId);
          if (!activeTask) return column;
          return { ...column, tasks: [...column.tasks, activeTask] };
        }
        if (column.id === activeColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeId),
          };
        }
        return column;
      });

      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = newColumns;
        }),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEndHandler}
      onDragOver={onDragOverHandler}
    >
      <div className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
        {columns?.length > 0 &&
          columns.map((item) => (
            <Column
              key={item.id}
              id={item.id}
              title={item.title}
              tasks={item.tasks}
            />
          ))}
        <button
          className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 self-start rounded-md p-3"
          onClick={addNewColumnHandler}
        >
          + New Column
        </button>
      </div>
    </DndContext>
  );
};

export default Workspace;
