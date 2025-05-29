import React, { useState, useEffect } from "react";
import "./Header.scss";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import { SlMenu as MenuIcon } from "react-icons/sl";
import { VscChromeClose as CloseIcon } from "react-icons/vsc";

export default function Header() {
  const [show, setShow] = useState("top");                          //for scrolling effect
  const [lastScrollY, setLastScrollY] = useState(0);                //for scrolling effect
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

// ------------------------------------------- USE  EFFECTS -----------------------------------------------

  useEffect(() => {
      window.scrollTo(0, 0);                                           // when page changes then set the scrollY to 0
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    setShowMobileMenu(false)
    setShowSearch(false)
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);




// ------------------------------------------- M E T H O D S -----------------------------------------------

  const controlNavbar = () => {
    if (window.scrollY > 250) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top")
    }
    setLastScrollY(window.scrollY);
  };
  
  const navigationHandler = (type) => {
    setShowMobileMenu(false);
    navigate(`/explore/${type}`);
  
  };

  const searchInputHandler = (e) => {
    if (e.key === "Enter" && searchInput.length > 0) {
      navigate(`/search/${searchInput}`);
      setShowSearch(false)
      // setTimeout(() => {
      //   setShowSearch(false);
      // }, 1000);
    }
  };

  const ShowSearchFunc = () => {
    setShowMobileMenu(false);
    setShowSearch(true);
  };
  const ShowMobileMenuFunc = () => {
    setShowSearch(false);
    setShowMobileMenu(true);
  };





// ------------------------------------------- R E T U R N -----------------------------------------------
 

  return (
    <header className={`header ${showMobileMenu && "mobileView"} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=> navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem" onClick={ShowSearchFunc}>
            <SearchIcon />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <SearchIcon className="mobileMenuItem" onClick={ShowSearchFunc} />
          {showMobileMenu ? (
            <CloseIcon className="mobileMenuItem" onClick={() => setShowMobileMenu(false)} />
          ) : (
            <MenuIcon className="mobileMenuItem" onClick={ShowMobileMenuFunc} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or Tv show..."
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={searchInputHandler}
              />
              <CloseIcon onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}
