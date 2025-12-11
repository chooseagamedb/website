import * as hello from "./functions/api/hello.js";
import * as test from "./functions/api/test.js";
// Add more imports as needed

const routes = {
  "hello": hello.default,
  "test": test.default,
  // add more here
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/functions/api/")) {
      const route = url.pathname.replace("/functions/api/", "");
      const handler = routes[route];

      if (handler) {
        return handler(request, env);
      } else {
        return new Response("API Not Found", { status: 404 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
