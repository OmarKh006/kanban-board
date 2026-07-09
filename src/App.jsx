import Button from "./components/Button";
import DropdownPrimitive from "./components/DropdownPrimitive";
import TextField from "./components/TextField";

function App() {
  return (
    <div className="text-main-purple text-heading-xl text-3xl">
      <Button variant="destructive" size="lg">
        Hello World!
      </Button>
      <TextField placeholder={"test"} />
      <DropdownPrimitive
        items={{
          delete: {
            label: "Delete Board",
            onClick: () => console.log("delete"),
          },
          edit: {
            label: "Edit Board",
            onClick: () => console.log("edit"),
          },
        }}
        triggerComponent={() => <Button variant="secondary">Actions</Button>}
      />
    </div>
  );
}

export default App;
