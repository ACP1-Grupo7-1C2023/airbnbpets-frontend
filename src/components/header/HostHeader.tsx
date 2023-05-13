import { useAppDispatch } from "../../state";
import { logout } from "../../state/actions";
import "../../styles/Header.scss";

export const HostHeader = () => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header_container">
      <h1 className="header_title">AirbnbPets</h1>
      <div className="header_link_container">
        <a className="header_link" href="/posts">
          My Posts
        </a>
      </div>
      <div className="header_button_container">
        <button className="main_button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}