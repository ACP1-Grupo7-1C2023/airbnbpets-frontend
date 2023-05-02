import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
