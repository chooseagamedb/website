export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle dynamic API routes under /functions/api/
    if (url.pathname.startsWith("/functions/api/")) {
      const path = url.pathname.replace("/functions/api/", "");
      try {
        const module = await import(`./functions/api/${path}.js`);
        return module.default(request, env);
      } catch (e) {
        return new Response("API Not Found", { status: 404 });
      }
    }

    // Otherwise serve static site files
    return env.ASSETS.fetch(request);
  }
};
