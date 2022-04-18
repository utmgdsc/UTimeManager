import React from "react";
import styles from "./TaskFilterSelector.module.css";
import { PropTypes } from "prop-types";

const FilterButton = ({ filter, filterSelected, onFilterChanged }) => {
  return (
    <button
      className={
        filter === filterSelected ? styles.selectedFilter : styles.filterButton
      }
      onClick={() => onFilterChanged(filter)}
    >
      {filter}
    </button>
  );
};

FilterButton.propTypes = {
  filter: PropTypes.string.isRequired,
  filterSelected: PropTypes.string.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
};

export const TaskFilterSelector = ({ filterSelected, onFilterChanged }) => {
  const filters = ["Day", "Week", "Month", "All"];
  const filterButtons = filters.map((filter, ix) => (
    <FilterButton
      key={ix}
      filter={filter}
      filterSelected={filterSelected}
      onFilterChanged={onFilterChanged}
    />
  ));
  return <div className={styles.filterBar}>{filterButtons}</div>;
};

TaskFilterSelector.propTypes = {
  filterSelected: PropTypes.string.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
};
