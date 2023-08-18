import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { assert } from "https://deno.land/std@0.198.0/assert/mod.ts";

export async function getAuthorInfo(author) {

    return await fetch("https://atcoder.jp/users/" + author + "?graph=rating").then(response => response.text()).then(data => {
        const textDOM = data;
        const DOM = new DOMParser().parseFromString(textDOM, "text/html");
        assert(DOM)
        // DOM化

        const scriptTags = DOM.querySelectorAll("script");

        for (let i = 0; i < scriptTags.length; i++) {
            if (scriptTags[i].textContent.includes("var rating_history")) {
                const rating_history = scriptTags[i].textContent;
                return rating_history;
            }
        }

        return 0;
    })
}