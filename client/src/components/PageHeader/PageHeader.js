import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import styles from "./PageHeader.module.css";
import { PropTypes } from "prop-types";

const MenuDropdown = ({ onClose }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    // TODO : API call for logout
    navigate("/");
  };

  return (
    <div className={styles.navDropdown}>
      <NavButton hamburger={false} onClick={onClose} />
      <div className={styles.menuItemContainer}>
        <MenuDropdownItem
          label={"Calendar"}
          action={() => navigate("/calendar")}
        />
        <MenuDropdownItem
          label={"Task History"}
          action={() => navigate("/task_history")}
        />
        <MenuDropdownItem
          label={"Insights"}
          action={() => navigate("/insights")}
        />
        <MenuDropdownItem label={"Log out"} action={handleLogOut} />
      </div>
    </div>
  );
};

const MenuDropdownItem = ({ label, action }) => {
  return (
    <button className={styles.navDropdownItem} onClick={action}>
      {label}
    </button>
  );
};

const NavButton = ({ hamburger, onClick }) => {
  return (
    <button className={styles.navButton} onClick={onClick}>
      {hamburger ? (
        <FiMenu className={styles.hamburgerIcon} />
      ) : (
        <MdClose className={styles.closeIcon} />
      )}
    </button>
  );
};

const PageHeader = ({ pageTitle }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <div className={styles.calendarHeaderContainer}>
      {menuOpened ? <MenuDropdown onClose={toggleMenu} /> : <></>}
      <NavButton hamburger={true} onClick={toggleMenu} />
      <p className={styles.calendarPageHeader}>{pageTitle}</p>
    </div>
  );
};

NavButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  hamburger: PropTypes.bool.isRequired,
};

MenuDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

MenuDropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

PageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default PageHeader;
