import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import styles from "./CalendarHeader.module.css";

const CalendarHeader = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className={styles.calendarHeaderContainer}>
      <button
        className={styles.navButton}
        onClick={() => {
          setMenuOpened(!menuOpened);
        }}
      >
        {!menuOpened ? (
          <FiMenu className={styles.hamburgerIcon} />
        ) : (
          <MdClose className={styles.hamburgerIcon} />
        )}
      </button>
      <p className={styles.calendarPageHeader}>Daily Tasks</p>
    </div>
  );
};

export default CalendarHeader;
