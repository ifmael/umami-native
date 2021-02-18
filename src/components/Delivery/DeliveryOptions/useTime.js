import { useContext } from "react";
import { GlobalContext } from "/context/GlobalContext";
import { getSchedule, getTimesShedule } from "/utils/time";

const useTime = () => {
  const { configuration } = useContext(GlobalContext);
  const schedule = getSchedule(configuration?.schedule);

  return schedule ? getTimesShedule(schedule) : [];
};

export default useTime;
