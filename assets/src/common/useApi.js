import * as apiHelper from "./apiHelpers";
import { useAuth } from "store";
import { useEffect, useState } from "react";

export const useApiEffect = (
  url,
  onSuccess,
  onFailure,
  { baseUrl = "api", onlyWhen = true } = {}
) => {
  const [{ jwt }] = useAuth();
  useEffect(
    () => {
      if (onlyWhen) {
        console.log("fetching " + url);
        let valid = true;
        apiHelper
          .get((baseUrl ? baseUrl + "/" : "") + url, { jwt })
          .then(data => {
            if (valid) onSuccess(data);
          })
          .catch(error => {
            if (valid) onFailure(error);
          });
        return () => (valid = false);
      }
    },
    [url, !!onlyWhen]
  );
};

export const useApi = (url, { baseUrl, onlyWhen = true } = {}) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const loading = result === null && !error;
  useApiEffect(
    url,
    data => setResult(data || true),
    err => setError(err || "error"),
    {
      baseUrl,
      onlyWhen: onlyWhen && loading
    }
  );
  useEffect(
    () => {
      if (onlyWhen && loading) {
        setResult(undefined);
        setError(undefined);
      }
    },
    [onlyWhen, loading]
  );
  return [result, error];
};

// export const useApiFancy = (url, { baseUrl, onlyWhen } = {}) => {
//   const [result, error] = useApi(url, { baseUrl, onlyWhen });
//   const loading = result === undefined && error === undefined;
//   return {
//     loading,
//     catch: fn => {
//       if (error !== undefined) {
//         if (typeof fn === "function") return fn(error);
//         return fn;
//       }
//       return null;
//     },
//     then: (success, failure = null, wait = null) => {
//       if (result !== undefined) {
//         if (typeof success === "function") return success(result);
//         return success;
//       }
//       if (failure && error !== undefined) {
//         if (typeof failure === "function") return failure(error);
//         return failure;
//       }
//       if (wait) {
//         if (typeof wait === "function") return wait();
//         return wait;
//       }
//       return null;
//     }
//   };
// };
