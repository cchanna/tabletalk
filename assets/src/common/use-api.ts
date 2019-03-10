import * as apiHelper from "./apiHelpers";
import { useAuth } from "store";
import { useEffect, useState } from "react";

type Method = "GET" | "POST";

type ApiOptions = {
  path: string;
  method?: "POST";
  body: any;
};
type OtherApiOptions = {
  endpoint?: "api" | "root";
  ignoreAuth?: boolean;
};

declare global {
  const process: {
    env: {
      NODE_ENV: "production" | "development";
      REACT_APP_API_URL: string;
    };
  };
}

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : `http://${process.env.REACT_APP_API_URL}`;

export const useApi = <T>(
  options: string | ApiOptions | null | undefined,
  set: (result: T) => void,
  { endpoint = "api", ignoreAuth = false }: OtherApiOptions = {}
) => {
  const [{ jwt }] = useAuth();
  let path = "";
  let method: Method = "GET";
  let body: string | undefined = undefined;
  if (typeof options === "string") path = options;
  else if (options) {
    path = options.path;
    (method = options.method || "POST"), (body = JSON.stringify(options.body));
  }
  const headers = {};
  if (jwt && !ignoreAuth) {
    headers["Authorization"] = "Bearer " + jwt;
  }
  if (method !== "GET") {
    headers["Content-Type"] = "application/json";
  }
  const url = path
    ? endpoint === "api"
      ? API_BASE_URL + "/api" + path
      : API_BASE_URL + path
    : "";

  useEffect(() => {
    if ((jwt || ignoreAuth) && url) {
      let valid = true;
      window
        .fetch(url, { method, body, headers })
        .then(data => data.json())
        .then(data => {
          if (valid) set(data);
        });
      return () => {
        valid = false;
      };
    }
  }, [!!jwt, ignoreAuth, url, method, body]);
};
