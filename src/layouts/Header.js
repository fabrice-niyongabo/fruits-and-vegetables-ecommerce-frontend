import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { appColors } from "../constants";

const Header = () => {
  const navigate = useNavigate();
  const { fullName } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand className="d-lg-none" onClick={() => navigate("/")}>
          <span className="h1 m-0 p-0" style={{ cursor: "pointer" }}>
            O<span style={{ color: appColors.RED }}>F</span>&
            <span style={{ color: appColors.GREEN }}>V</span>M
          </span>
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <span className="text-white">
              Online Fruits & Vegetables Market - Administration
            </span>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <span>{fullName.split(" ")[0]}</span>
            &nbsp; &nbsp;
            <i className="bi bi-person-circle" style={{ fontSize: 25 }} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header style={{ textTransform: "uppercase" }}>
              {fullName}
            </DropdownItem>
            <DropdownItem onClick={() => navigate("/dashboard/profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onClick={() => navigate("/logout")}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
