import { setConfig, cold } from "react-hot-loader";

setConfig({
  ignoreSFC: true,
  pureRender: true,
  onComponentCreate: type =>
    (String(type).indexOf("useState") > 0 ||
      String(type).indexOf("useEffect") > 0) &&
    cold(type)
});
