import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import styles from "./Header.module.css";
import { PropTypes } from "prop-types";

import { instance } from "../../axios";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    // TODO : API call for logout
    const submitURL = "/api/users/logout";

    await instance.post("/users/logout", {}, { withCredentials: true });

    navigate("/");
  };

  return (
    <div className={styles.navDropdown}>
      <NavButton isClosed={false} onClick={onClose} />
      <div className={styles.menuItemContainer}>
        <SidebarItem label={"Calendar"} action={() => navigate("/calendar")} />
        <SidebarItem
          label={"Task History"}
          action={() => navigate("/task_history")}
        />
        <SidebarItem label={"Insights"} action={() => navigate("/insights")} />
        <SidebarItem
          label={"Log out"}
          action={async () => {
            await handleLogOut();
          }}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ label, action }) => {
  return (
    <button className={styles.navDropdownItem} onClick={action}>
      {label}
    </button>
  );
};

const NavButton = ({ isClosed, onClick }) => {
  return (
    <button className={styles.navButton} onClick={onClick}>
      {isClosed ? (
        <FiMenu className={styles.hamburgerIcon} />
      ) : (
        <MdClose className={styles.closeIcon} />
      )}
    </button>
  );
};

const Header = ({ pageTitle }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <div className={styles.calendarHeaderContainer}>
      {menuOpened ? <Sidebar onClose={toggleMenu} /> : <></>}
      <NavButton isClosed={true} onClick={toggleMenu} />
      <p className={styles.calendarPageHeader}>{pageTitle}</p>
    </div>
  );
};

NavButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClosed: PropTypes.bool.isRequired,
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
