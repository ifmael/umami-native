import { useState, useEffect } from "react";

const useCategories = (dataFromServer) => {
  const [days, setDays] = useState();

  useEffect(() => {
    if (!dataFromServer) return;

    const { days: daysServer } = dataFromServer;

    //Why is frozen?
    setDays(daysServer.slice().sort((a, b) => a.key - b.key));
  }, [dataFromServer]);

  return days;
};

export default useCategories;
