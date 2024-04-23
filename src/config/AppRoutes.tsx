import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "../page";
import { Wrapper } from "../components";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Wrapper>
              <Outlet />
            </Wrapper>
          }
        >
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
