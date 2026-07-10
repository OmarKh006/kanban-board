import { DataContext } from "@/DataContext";
import { produce } from "immer";
import { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ title, columnId, cardId }) => {
  const { selectedBoardIndex, setData } = useContext(DataContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: cardId,
      data: { columnId },
    });

  const onDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this task ??")) {
      setData((prev) =>
        produce(prev, (draft) => {
          const column = draft[selectedBoardIndex].columns.find(
            (col) => col.id === columnId,
          );
          if (!column) return;
          column.tasks = column.tasks.filter((task) => task.id !== cardId);
        }),
      );
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(true);
  };

  const onBlurHandler = (e) => {
    setIsEditMode(false);
    const newTitle = e.target.value.trim();
    if (newTitle === title || newTitle === "") return;
    setData((prev) =>
      produce(prev, (draft) => {
        const column = draft[selectedBoardIndex].columns.find(
          (col) => col.id === columnId,
        );
        if (!column) return;
        const task = column.tasks.find((t) => t.id === cardId);
        if (!task) return;
        task.title = newTitle;
      }),
    );
  };

  const onKeyDownHandler = (e) => {
    e.key === "Enter" && e.target.blur();
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {!isEditMode ? (
        <button
          className="peer text-heading-m h-full text-start"
          onClick={toggleEditMode}
        >
          {title}
        </button>
      ) : (
        <textarea
          className="text-heading-m outline-light-grey h-full resize-none"
          defaultValue={title}
          onFocus={(e) => e.target.select()}
          onBlur={onBlurHandler}
          onKeyDown={onKeyDownHandler}
          autoFocus
        ></textarea>
      )}
      <button
        className="text-body-m text-red absolute top-0 right-0 bottom-0 bg-white p-2 opacity-0 shadow duration-300 group-hover/card:opacity-100 peer-focus:opacity-100 focus:opacity-100"
        onClick={onDeleteHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
