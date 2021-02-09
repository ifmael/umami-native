import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/es";

dayjs.extend(isBetween).extend(isSameOrBefore);

const startToday = dayjs().startOf("date");
const eight = dayjs().hour(20).minute(0).second(0);
const ten = dayjs().hour(22).minute(0).second(0);
const tenHalf = dayjs().hour(22).minute(30).second(0);
const maxTimev1 = dayjs().hour(23).minute(0).second(0);
const maxTimev2 = dayjs().hour(23).minute(30).second(0);
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

export const getListOfTimes = () => {
  let listOfTimes;
  const now = dayjs();

  if (now.isBetween(startToday, ten)) {
    const initialTime = now.isBefore(eight) ? getRoundedTime(eight) : getRoundedTime(now);

    listOfTimes = generateListOfTimes(initialTime, maxTimev1);
  } else if (now.isBetween(ten, tenHalf)) {
    const initialTime = getRoundedTime(now);
    listOfTimes = generateListOfTimes(initialTime, maxTimev2);
  } else if (now.isAfter(tenHalf)) {
    listOfTimes = [];
  }

  return listOfTimes;
};
