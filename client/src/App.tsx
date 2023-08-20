import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workspace from "./pages/Workspace";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Workspace />,
    children: [
      {
        path: "chats/:chatId",
        element: <Workspace />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="flex flex-row w-full h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
