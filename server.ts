import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

export default createStartHandler({
  createRouter: () => import("./src/router"),
})(defaultStreamHandler);
