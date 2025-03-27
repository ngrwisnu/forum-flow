import { Link } from "react-router-dom";
import logo from "../../assets/horizontal.png";
import defaultImage from "../../assets/default-image.webp";
import { AlignLeft } from "lucide-react";
import type { UserType } from "../../types/user";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { asyncUserLogout } from "../../store/auth/action";

interface HeaderProps {
  user: UserType | null;
}

const Header = ({ user }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = () => {
    dispatch(asyncUserLogout());
  };

  return (
    <header className="navbar bg-base-100 shadow-sm">
      <div className="flex flex-1 items-center justify-start">
        <div className="flex items-center justify-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <AlignLeft size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/leaderboards">Leaderboard</Link>
              </li>
            </ul>
          </div>
          <img src={logo} alt="logo-brand" className="h-9" />
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 py-0">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/leaderboards">Leaderboard</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-5">
        <div className="flex items-center gap-3">
          <div>{user?.name}</div>
          <div className="size-8 overflow-hidden rounded-full">
            <img src={user?.avatar || defaultImage} alt="profile-pic" />
          </div>
        </div>
        <div className="grow-0">
          {!user && (
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          )}
          {user && (
            <Button className="btn-outline" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
