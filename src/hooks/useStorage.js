import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const key = "@lastOrders";
const keyVersion = "@storeVersion";
const valueVersion = "1.0.0";

const useStorage = () => {
  const [lastOrdersStorage, setLastOrdersStorage] = useState(null);

  const saveIntoLastOrders = async (value) => {
    try {
      const stringify = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringify);
    } catch (error) {
      console.log(error);
    }
  };

  const getLastOrders = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setLastOrdersStorage(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }, [setLastOrdersStorage]);

  useEffect(() => {
    getLastOrders();
  }, [getLastOrders]);

  useEffect(() => {
    const getVersion = async () => {
      try {
        const value = await AsyncStorage.getItem(keyVersion);
        const currentValue = JSON.parse(value);
        if (!currentValue) await AsyncStorage.setItem(keyVersion, JSON.stringify(valueVersion));
        else if (valueVersion !== currentValue) {
          // Code to migrate store
        }
      } catch (error) {
        console.log(error);
      }
    };

    getVersion();
  }, []);

  return { lastOrdersStorage, saveIntoLastOrders, getLastOrders };
};

export default useStorage;
