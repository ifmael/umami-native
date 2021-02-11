import { useContext } from "react";
import { GlobalContext } from "/context/GlobalContext";
import { timeFormatFromBackend } from "/constant";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/es";

dayjs.locale("es");
dayjs.extend(isBetween).extend(isSameOrBefore).extend(customParseFormat);

const startToday = dayjs().startOf("date");
const range = 30;

const getRoundedTime = (time) => {
  const minutes = time.minute();

  return minutes < 15
    ? time.minute(0).add(1, "hour")
    : 15 >= minutes && minutes < 45
    ? time.minute(30).add(1, "hour")
    : time.minute(0).add(2, "hour");
};

const generateListOfTimes = (initialTime, lastTime) => {
  let listOfTimes = [{ id: 0, time: "Lo antes posible" }];
  let numberIteration = 1;
  let nextTime = dayjs(initialTime);

  do {
    listOfTimes.push({ id: numberIteration, time: nextTime.format("HH:mm") });
    nextTime = initialTime.add(numberIteration * range, "minute");
    ++numberIteration;
  } while (nextTime.isSameOrBefore(lastTime));

  return listOfTimes;
};

const parseTimeConfiguration = (schedule) => {
  try {
    const locale = "es";
    const openingTime = dayjs(schedule.openingTime, timeFormatFromBackend, locale);
    const closingTime = dayjs(schedule.closingTime, timeFormatFromBackend, locale);
    const initTimeLastSection = dayjs(schedule.initTimeLastSection, timeFormatFromBackend, locale);
    const lastTimelatestSection = dayjs(schedule.lastTimelatestSection, timeFormatFromBackend, locale);
    const lastTimeUsualSection = dayjs(schedule.lastTimiUsualSection, timeFormatFromBackend, locale);

    return {
      openingTime,
      closingTime,
      initTimeLastSection,
      lastTimelatestSection,
      lastTimeUsualSection,
    };
  } catch (error) {
    console.log(error);
  }
};

const getTimeSection = (configuration) => {
  const {
    openingTime,
    closingTime,
    initTimeLastSection,
    lastTimelatestSection,
    lastTimeUsualSection,
  } = parseTimeConfiguration(configuration);
  const now = dayjs();

  let listOfTimes;

  if (now.isBetween(startToday, initTimeLastSection)) {
    const initialTime = now.isBefore(openingTime) ? getRoundedTime(openingTime) : getRoundedTime(now);
    listOfTimes = generateListOfTimes(initialTime, lastTimeUsualSection);
  } else if (now.isBetween(initTimeLastSection, closingTime)) {
    const initialTime = getRoundedTime(now);
    listOfTimes = generateListOfTimes(initialTime, lastTimelatestSection);
  } else if (now.isAfter(closingTime)) {
    listOfTimes = [];
  }

  return listOfTimes;
};

const useTime = () => {
  const { configuration } = useContext(GlobalContext);
  let listOfTimes;

  if (Array.isArray(configuration?.schedule)) {
    const scheduleSorted = configuration.schedule.sort((a, b) => a.order - b.order);
    let skipItemInReduce = 0;

    /**
     *  Create an unique array with all list of hours from  the different meals of the day.
     *  Remove the "lo antes posible" and  control creates new ids when there is some skip in the iteration
     */
    listOfTimes = scheduleSorted.flatMap(getTimeSection).reduce((acc, hourItem, index) => {
      if (hourItem.id !== index && hourItem.id === 0) ++skipItemInReduce;

      return hourItem.id === index
        ? [...acc, hourItem]
        : hourItem.id === 0
        ? acc
        : [...acc, { ...hourItem, id: index - skipItemInReduce }];
    }, []);
  } else {
    listOfTimes = [configuration.schedule].map(getTimeSection);
  }

  return listOfTimes;
};

export default useTime;
