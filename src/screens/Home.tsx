import { Header } from "../components/Header";
import { useAppSelector } from "../state";

export const Home = () => {
  const token = useAppSelector(auth => auth.auth.token);

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <p>Token: {token}</p>
    </div>
  );
}
