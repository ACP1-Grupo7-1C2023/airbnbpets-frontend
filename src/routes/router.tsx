import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../screens/public/Login";
import { Signup } from "../screens/public/Signup";
import { useAppSelector } from "../state";
import { SitterHome } from "../screens/sitter/Home";
import { HostHome } from "../screens/host/Home";

export const AppRouter = () => {
  const session = useAppSelector(auth => auth.auth.session);

  return (
    <BrowserRouter>
      <Routes>
        {session ? (
          session.type === 'petSitter' ? (
            <>
              <Route path="/home" element={<SitterHome />} />
              <Route path="*" element={<Navigate replace to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<HostHome />} />
              <Route path="*" element={<Navigate replace to="/home" />} />
            </>
          )
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
