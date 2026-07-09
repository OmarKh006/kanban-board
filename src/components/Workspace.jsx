import Column from "./Column";

/**
 *
 * @param {Object} props
 * @param {Array} props.columns - An array of column objects, each containing an id, title, and tasks.
 * @param {string} props.columns[].id - The unique identifier for each column.
 * @param {Array} props.columns[].tasks - An array of task objects for each column, each containing an id and title.
 * @param {string} props.columns[].title - The title of the column.
 * @returns {JSX.Element} A React component that renders a workspace with columns and a button to add a new column.
 */

const Workspace = ({ columns = [] }) => {
  return (
    <div className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
      {columns.map((column) => (
        <Column key={column.id} tasks={column.tasks} title={column.title} />
      ))}
      <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 self-start rounded-md p-3">
        + New Column
      </button>
    </div>
  );
};

export default Workspace;
