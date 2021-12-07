import { timeFormatFromBackend } from "/constant";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/es";

dayjs.locale("es");
dayjs.extend(isBetween).extend(isSameOrBefore).extend(customParseFormat).extend(isoWeek);

const range = 30;
const now = dayjs();

const getRoundedTime = (time) => {
  const minutes = time.minute();

  return minutes < 15
    ? time.minute(0).second(0).millisecond(0).add(1, "hour")
    : minutes >= 15 && minutes < 45
    ? time.minute(30).second(0).millisecond(0).add(1, "hour")
    : time.minute(0).second(0).millisecond(0).add(2, "hour");
};

const generateListOfTimes = (initialTime, lastTime) => {
  let listOfTimes = [{ id: 0, time: "Lo antes posible" }];
  let numberIteration = 1;
  let nextTime = dayjs(initialTime);

  if (initialTime.isAfter(lastTime)) {
    listOfTimes.push({ id: numberIteration, time: lastTime.format("HH:mm") });
    return listOfTimes;
  }

  do {
    listOfTimes.push({ id: numberIteration, time: nextTime.format("HH:mm") });
    nextTime = initialTime.add(numberIteration * range, "minute");
    ++numberIteration;
  } while (nextTime.isSameOrBefore(lastTime));

  return listOfTimes;
};

const parseTimeSchedule = (schedule) => {
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

export const getTimesShedule = (schedule) => {
  const {
    openingTime,
    closingTime,
    // initTimeLastSection,
    lastTimelatestSection,
    // lastTimeUsualSection,
  } = parseTimeSchedule(schedule);

  let listOfTimes;

  if (now.isBetween(openingTime, closingTime)) {
    const initialTime = getRoundedTime(now);
    listOfTimes = generateListOfTimes(initialTime, lastTimelatestSection);
  } else if (now.isAfter(closingTime)) {
    listOfTimes = [];
  }

  return listOfTimes;
};

export const getSchedule = (schedules) => {
  try {
    const todayKey = dayjs().isoWeekday();
    let scheduleSelected;

    for (const schedule of schedules) {
      const { closingTime, days, openingTime } = schedule;
      const isOpenInThisSchedule = days.map(({ key }) => key).includes(todayKey);

      if (isOpenInThisSchedule) {
        const openingTimeParsed = dayjs(openingTime, timeFormatFromBackend);
        const closingTimeParsed = dayjs(closingTime, timeFormatFromBackend);

        if (now.isBetween(openingTimeParsed, closingTimeParsed)) {
          scheduleSelected = schedule;
          break;
        }
      }
    }

    return scheduleSelected;
  } catch (error) {
    console.log(error);
  }
};

/**
 *  This function checks in the array of schedules if there is some occurence which matches with today
 *
 * @param {*} schedules  Array of schedule
 */
export const isOpenToday = (schedules) => {
  if (!Array.isArray(schedules)) return false;

  dayjs.extend(isoWeek);
  const todayKey = dayjs().isoWeekday();

  return schedules.some(({ days }) => {
    return days.some(({ key }) => key === todayKey);
  });
};

export const getOptionsFilled = (configurations) => {
  return Array.isArray(configurations)
    ? configurations?.filter((configuration) => Object.keys(configuration).length > 1)
    : [];
};
