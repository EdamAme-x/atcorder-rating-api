import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serve } from "https://deno.land/std@0.198.0/http/server.ts";
import { getAuthorInfo } from "./index.js";

const app = new Hono();

app.all("*", async (c) => {
    let url_obj = new URL(c.rawRequest.url);
    let author = url_obj.searchParams.get("author") ? url_obj.searchParams.get("author") : "not_found";

    let author_info = await getAuthorInfo(author);
    

    let path = c._path
    switch (path) {
        case "/":
            path = "./base.html"
            break
        case "/rating.js":
            path = "./rating.js"
            break
    }
    const file_content = Deno.readFileSync(path);
    let file_text = new TextDecoder().decode(file_content);
    file_text = file_text.replaceAll("__author__", author);
    file_text = file_text.replaceAll("__rating_history__", author_info);

    return c.html(file_text);
})

serve(app.fetch);