import { Outlet } from "react-router-dom";
import { SideBar } from "./components/shared";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <main className="main_layout w-full site-main">
        <SideBar />
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

export default App;
