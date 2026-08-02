import { createFileRoute } from "@tanstack/react-router";
import cardapioHtml from "../cardapio.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(cardapioHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
