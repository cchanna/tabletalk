import * as apiHelper from "./apiHelpers";
import { useAuth } from "store";
import { useEffect } from "react";

export const useApiEffect = (url, onSuccess, onFailure) => {
  const [{ jwt }] = useAuth();
  useEffect(
    () => {
      let valid = true;
      apiHelper
        .get(url, { jwt })
        .then(data => {
          if (valid) onSuccess(data);
        })
        .catch(error => {
          if (valid) onFailure(error);
        });
      return () => (valid = false);
    },
    [url]
  );
};
