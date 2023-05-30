import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../state";
import { logout } from "../../state/actions";
import "../../styles/Header.scss";

export const SitterHeader = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header_container">
      <h1 className="header_title">AirbnbPets</h1>
      <div className="header_link_container">
        <a className={`header_link ${location.pathname === "/posts" && "header_link_active"}`} href="/posts">
          Posts
        </a>
        <a className={`header_link ${location.pathname === "/applications" && "header_link_active"}`} href="/applications">
          My Applications
        </a>
        <a className={`header_link ${location.pathname === "/subscriptions" && "header_link_active"}`} href="/subscriptions">
          Subscriptions
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
