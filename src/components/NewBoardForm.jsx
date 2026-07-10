import { useContext, useState } from "react";
import Button from "./Button";
import TextField from "./TextField";
import iconCross from "@assets/icon-cross.svg";
import { DataContext } from "@/DataContext";

const NewBoardForm = ({
  boardId,
  toggleDialogue,
  title,
  columns = () => [{ id: Date.now() }],
}) => {
  const { setData, setSelectedBoardIndex } = useContext(DataContext);
  const [columnsArray, setColumnsArray] = useState(columns);

  const removeColumnHandler = (index) => {
    setColumnsArray((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addNewColumnHandler = () => {
    setColumnsArray((prev) => [...prev, { id: Date.now() }]);
  };

  const createNewColumnsArray = (formData, columnsArray, boardId) => {
    const tasksArray = boardId ? columnsArray.tasks : [];
    return columnsArray.map((column) => {
      return {
        id: column.id,
        title: formData.get(column.id),
        tasks: tasksArray,
      };
    });
  };

  const updateData = (boardName, newColumnsArray, setData, boardId) => {
    setData((prev) => {
      let newData;
      if (boardId) {
        newData = prev.map((item) => {
          if (item.id === boardId) {
            return {
              ...item,
              title: boardName,
              columns: newColumnsArray,
            };
          }
          return item;
        });
      } else {
        newData = [
          ...prev,
          {
            id: Date.now(),
            title: boardName,
            columns: newColumnsArray,
          },
        ];
        setSelectedBoardIndex(prev.length);
      }
      return newData;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");
    const newColumnsArray = createNewColumnsArray(
      formData,
      columnsArray,
      boardId,
    );
    updateData(boardName, newColumnsArray, setData, boardId);
    toggleDialogue(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3 className="text-body-m text-medium-grey pt-6 pb-2">Name</h3>
        <TextField
          placeholder="e.g. Web Design"
          name="boardName"
          defaultValue={title}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-body-m text-medium-grey pt-6">Columns</h3>
        {columnsArray.map((obj, index) => (
          <div key={obj.id} className="flex items-center gap-4">
            <TextField
              placeholder="e.g. Web Design"
              name={obj.id}
              defaultValue={obj.title}
              required
            />
            <button type="button" onClick={() => removeColumnHandler(index)}>
              <img src={iconCross} alt="icon cross" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addNewColumnHandler}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="sm" isFullWidth>
          {boardId ? "Update" : "Create New"} Board
        </Button>
      </div>
    </form>
  );
};

export default NewBoardForm;
