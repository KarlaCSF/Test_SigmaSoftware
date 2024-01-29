import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { Home } from "../pages";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" element={<Home />} />

        <Route path="*" element={<Navigate to="/home" />} />

      </Switch>
    </BrowserRouter>
  );
};
