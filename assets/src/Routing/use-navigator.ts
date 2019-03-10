import { useMemo } from "react";
import { useRouting } from "store";
import history from "app-history";

const useNavigator = (depth = 0) => {
  const [{ fullPath }] = useRouting();

  const here = fullPath.slice(0, depth);
  const path = fullPath.slice(depth);
  const next = fullPath[depth] || null;

  return useMemo(
    () => ({
      fullPath,
      path,
      here,
      next,
      goTo: (p: string | string[] = [], d = 0) => {
        if (!Array.isArray(p)) p = [p];
        const newPath = [...fullPath.slice(0, depth + d), ...p];
        history.push("/" + newPath.join("/"));
      },
      goBack: () => {
        history.goBack();
      },
      replace: (p: string | string[] = [], d = 0) => {
        if (!Array.isArray(p)) p = [p];
        const newPath = [...fullPath.slice(0, depth + d), ...p];
        history.replace("/" + newPath.join("/"));
      }
    }),
    [fullPath, depth]
  );
};

export default useNavigator;
