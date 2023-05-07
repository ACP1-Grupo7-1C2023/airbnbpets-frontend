import { useAppDispatch, useAppSelector } from "../state";
import { logout } from '../state/actions';

export const Home = () => {
  const token = useAppSelector(auth => auth.auth.token);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Token: {token}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
