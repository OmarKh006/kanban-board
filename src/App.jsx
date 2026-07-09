import Button from "./components/Button";
import TextField from "./components/TextField";

function App() {
  return (
    <h1 className="text-3xl text-main-purple text-heading-xl">
      <Button variant="destructive" size="lg">
        Hello World!
      </Button>
      <TextField placeholder={"test"} />
    </h1>
  );
}

export default App;
