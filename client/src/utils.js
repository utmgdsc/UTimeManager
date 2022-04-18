export const formatDateforAPI = (currDate) => {
  // getMonth returns 0-11
  const currMonthStr = String(currDate.getMonth() + 1).padStart(2, "0");
  // getDate returns 1-31
  const currDayStr = String(currDate.getDate()).padStart(2, "0");
  return currDate.getFullYear().toString() + currMonthStr + currDayStr;
};

export const buildDateRangeRoute = (startDate, endDate) => {
  return `/api/tasks?start=${formatDateforAPI(
    startDate
  )}&end=${formatDateforAPI(endDate)}`;
};

const getDateTime = (taskDateISOString) => {
  const taskDate = new Date(taskDateISOString);

  return [
    taskDate.toLocaleDateString(),
    taskDate.toTimeString().substring(0, 5),
  ];
};

export const convertTaskData = (fetchedTaskData) => {
  // TODO : get task location from fetched tasks
  return fetchedTaskData.map(function (task) {
    const [taskDate, startTime] = getDateTime(task.startDate);
    const endTime = getDateTime(task.endDate)[1];
    return {
      title: task.title,
      location: "task location to be added",
      startTime: `${taskDate} ${startTime}`,
      endTime: endTime,
      date: taskDate,
      ongoing: task.isStarted && !("taskEndedAt" in task),
      finished: task.isStarted && "taskEndedAt" in task,
    };
  });
};

export const getMonthRange = () => {
  const firstDay = new Date();
  firstDay.setDate(1);

  const lastDay = new Date(firstDay);
  lastDay.setMonth(lastDay.getMonth() + 1);
  lastDay.setDate(0);

  return [firstDay, lastDay];
};

export const getWeekRange = () => {
  const monday = new Date();
  const dayOffset = monday.getDay() === 0 ? 7 : monday.getDay();
  monday.setDate(monday.getDate() - dayOffset + 1);

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 7 - sunday.getDay());

  return [monday, sunday];
};
