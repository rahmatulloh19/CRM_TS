import { Outlet } from "react-router-dom";
import { SideBar } from "./components/shared";

function App() {
  return (
    <>
      <main className="main_layout w-full site-main">
        <SideBar />
        <Outlet />
      </main>
    </>
  );
}

export default App;
