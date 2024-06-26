import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import UserStore from "../../store/UserStore";
import UserSubmitButton from "../user/UserSubmitButton";
import CartStore from "../../store/CartStore";


const TopNavigation = () => {
  
  const { searchByKeyword, setSearchKeyword } = ProductStore();
  const { isLogin , userLogout} = UserStore();
  const { cartCount , getCartList} = CartStore();
  const navigate = useNavigate();

  const handleLogout=async()=>{
    await userLogout();
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  }

  useEffect(()=>{
    (async()=>{
      if (isLogin()) {
        await getCartList();
      }
    })()
  }, []);

  return (
    <>
      <div className="container-fluid text-white p-1 bg-success">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-md-6">
              <span>
                <span className="f-12">
                  <i className="bi bi-envelope"></i>{" "}
                  Support@noakhalisellbazar.com{" "}
                </span>
                <span className="f-12 mx-2">
                  <i className="bi bi-envelope"></i> 01774688159{" "}
                </span>
              </span>
            </div>
            <div className="col-md-6">
              <span className="float-end">
                <span className="bodySmal mx-2">
                  <i className="bi bi-whatsapp"></i>
                </span>
                <span className="bodySmal mx-2">
                  <i className="bi bi-youtube"></i>
                </span>
                <span className="bodySmal">
                  <i className="bi bi-facebook"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-md-top">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Noakhali Sell Bazar
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link className="nav-link" to="/electronics">
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/mobile">
                      Mobile & Accessories
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="nav-link" to="/clothes">
                      Clothes
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <div className=" d-lg-flex">
              <div className="input-group">
                <input
                  value={searchByKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Link
                  to={
                    searchByKeyword.length > 0
                      ? `/listByKeyword/${searchByKeyword}`
                      : `/`
                  }
                  className="btn btn-outline-dark"
                  type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ width: 24, height: 24 }}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </Link>
              </div>
              <Link
                to="/cart"
                type="button"
                className="btn ms-2 btn-light position-relative">
                <i className="bi text-dark bi-bag"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {cartCount}
                  <span className="visually-hidden">unread message</span>
                </span>
              </Link>
              <Link
                to="/wish"
                type="button"
                className="btn ms-2 btn-light d-flex">
                <i className="bi text-dark bi-heart"></i>
              </Link>

              {isLogin() ? (
                <>
                <Link
                    type="button"
                    className="btn ms-3 btn-success d-flex"
                    to="/profile">
                    Profile
                  </Link>
                  <UserSubmitButton onClick={handleLogout} text="Logout" className="btn ms-3 btn-success d-flex">
                    Logout
                  </UserSubmitButton>
                  
                </>
              ):(
                <Link
                  type="button"
                  className="btn ms-3 btn-success d-flex"
                  to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavigation;
