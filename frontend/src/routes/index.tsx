import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { Home } from "../pages";
import { Form } from "../pages";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />

        <Route path="*" element={<Navigate to="/home" />} />

      </Switch>
    </BrowserRouter>
  );
};
