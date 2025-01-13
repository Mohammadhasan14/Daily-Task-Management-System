import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/add" element={<Task />} />
          <Route path="/tasks/:taskId" element={<Task />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
