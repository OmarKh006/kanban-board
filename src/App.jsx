import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <div className="flex h-screen flex-col text-3xl">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
      </div>
    </div>
  );
}

export default App;
