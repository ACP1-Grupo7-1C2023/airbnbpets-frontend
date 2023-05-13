import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../screens/public/Login";
import { Signup } from "../screens/public/Signup";
import { useAppSelector } from "../state";
import { UserType } from "../interfaces/AppInterfaces";
import { PostList } from "../screens/sitter/PostList";
import { MyPosts } from "../screens/host/MyPosts";
import { HostPost } from "../screens/host/Post";
import { SitterPost } from "../screens/sitter/Post";

export const AppRouter = () => {
  const session = useAppSelector(auth => auth.auth.session);

  return (
    <BrowserRouter>
      <Routes>
        {session ? (
          session.type === UserType.Sitter ? (
            <>
              <Route path="/posts" element={<PostList />} />
              <Route path="/post/:id" element={<SitterPost />} />
              <Route path="*" element={<Navigate replace to="/posts" />} />
            </>
          ) : (
            <>
              <Route path="/posts" element={<MyPosts />} />
              <Route path="/post/:id" element={<HostPost />} />
              <Route path="*" element={<Navigate replace to="/posts" />} />
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
