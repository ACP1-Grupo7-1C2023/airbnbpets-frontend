import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";
import { useAppSelector } from "../state";
import { Home } from "../screens/Home";

export const AppRouter = () => {
  const session = useAppSelector(auth => auth.auth.session);

  return (
    <BrowserRouter>
      <Routes>
        {session ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
