import { useState } from "react";
import Button from "./Button";
import TextField from "./TextField";
import iconCross from "@assets/icon-cross.svg";

const NewBoardForm = () => {
  const [columnsArray, setColumnsArray] = useState(() => [{ id: Date.now() }]);

  const removeColumnHandler = (index) => {
    setColumnsArray((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addNewColumnHandler = () => {
    setColumnsArray((prev) => [...prev, { id: Date.now() }]);
  };

  return (
    <form>
      <div>
        <h3 className="text-body-m text-medium-grey pt-6 pb-2">Name</h3>
        <TextField placeholder="e.g. Web Design" name="boardName" required />
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
            <button onClick={() => removeColumnHandler(index)}>
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
          Create New Board
        </Button>
      </div>
    </form>
  );
};

export default NewBoardForm;
