<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import "../app.css";
    import { fade_out, fade_in } from "$lib/fade.js";
    import { page_state } from "$lib/state.svelte.js";

    const is_on_page = (path: string): "header-item-selected" | "" => {
        if (path === "whoami")
            return page.url.pathname === `${base}/`
                ? "header-item-selected"
                : "";
        return page.url.pathname.includes(path) ? "header-item-selected" : "";
    };

    const animate_header_footer = (
        header: boolean,
        toggle_first: boolean
    ): string => {
        if (page_state.first_load) {
            if (toggle_first) page_state.first_load = false;

            if (page.url.pathname === `${base}/`)
                return header ? "header-float-in" : "footer-float-in";
        }

        return "";
    };

    // If navigating to a different page on the same website,
    // fade in and out everything except the header.
    const navigate = (e: Event, location: string) => {
        if (location !== page.url.pathname) {
            e.preventDefault();
            const body_except_header = document.getElementById(
                "body-except-header-footer"
            );
            if (body_except_header) {
                fade_out(body_except_header, 100);
                setTimeout(() => {
                    goto(location);
                }, 160);
                setTimeout(() => {
                    fade_in(body_except_header, 120);
                }, 230);
            }
        }
    };

    let { children } = $props();
</script>

<div
    class={`bg-dark-surface border-dark-highlight-low z-50 h-10 w-full border-b-1 shadow-md ${animate_header_footer(true, false)}`}
>
    <div
        class="text-dark-subtle mx-auto mb-10 flex max-w-4xl items-center justify-around px-4 py-2"
    >
        <a
            onclick={(e) => navigate(e, base + "/")}
            href="{base}/"
            class={"header-item " + is_on_page("whoami")}>Whoami</a
        >
        <a
            onclick={(e) => navigate(e, base + "/projects")}
            href="{base}/projects"
            class={"header-item " + is_on_page("projects")}>Projects</a
        >
        <a
            onclick={(e) => navigate(e, base + "/uni")}
            href="{base}/uni"
            class={"header-item " + is_on_page("uni")}>Uni</a
        >
        <a
            onclick={(e) => navigate(e, base + "/fun")}
            href="{base}/socials"
            class={"header-item " + is_on_page("fun")}>For Fun</a
        >
    </div>
</div>

<div id="body-except-header-footer">
    {@render children()}
</div>

<div
    id="footer"
    class={`text-dark-subtle border-dark-highlight-low mt-10 flex h-10 w-full flex-col justify-center border-t-2 ${animate_header_footer(false, true)}`}
>
    <div class="flex h-full w-full flex-row items-center justify-between px-5">
        <a href="https://github.com/nokotan8/portfolio" class="text-xs"
            >Source</a
        >
        <span class="flex flex-row gap-4 text-sm">
            <a href="https://github.com/nokotan8" target="_blank">GitHub</a>
            <a href="" target="_blank">Discord</a>
            <a>LinkedIn</a>
        </span>
    </div>
</div>
