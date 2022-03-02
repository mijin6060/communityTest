import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { ReactComponent as Logout } from "../assets/Logout.svg";
import { ReactComponent as Wallet } from "../assets/Wallet.svg";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // 화면 크기에 따라서 버튼이 보이고 안보이도록 설정한다.
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // SIGNUP버튼이 사이즈가 줄어들면 없어지도록 한다.
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <Logo />
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/wallet"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Wallet />
                Wallet
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signIn"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Logout />
                LogOut
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
