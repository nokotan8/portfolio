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
            )!;
            fade_out(body_except_header, 100);
            setTimeout(() => {
                goto(location);
            }, 160);
            setTimeout(() => {
                fade_in(body_except_header, 150);
            }, 280);
        }
    };

    const copy_discord_user = (username: string) => {
        navigator.clipboard.writeText(username);

        let discord_tooltip = document.getElementById("discord-tooltip")!;
        discord_tooltip.innerText = "Copied";
        discord_tooltip.classList.add("text-dark-foam!");
        setTimeout(() => {
            discord_tooltip.innerText = username;
            discord_tooltip.classList.remove("text-dark-foam!");
        }, 1250);
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
            class={"header-item font-medium " + is_on_page("whoami")}>Whoami</a
        >
        <a
            onclick={(e) => navigate(e, base + "/projects")}
            href="{base}/projects"
            class={"header-item font-medium " + is_on_page("projects")}
            >Projects</a
        >
        <a
            onclick={(e) => navigate(e, base + "/uni")}
            href="{base}/uni"
            class={"header-item font-medium " + is_on_page("uni")}>Uni</a
        >
        <a
            onclick={(e) => navigate(e, base + "/fun")}
            href="{base}/fun"
            class={"header-item font-medium " + is_on_page("fun")}>For Fun</a
        >
    </div>
</div>

<div id="body-except-header-footer" class="flex! grow flex-col">
    {@render children()}
</div>

<div
    id="footer"
    class={`text-dark-subtle border-dark-highlight-low mt-10 flex min-h-10 w-full flex-col justify-center border-t-2 ${animate_header_footer(false, true)}`}
>
    <div class="flex h-full w-full flex-row items-center justify-between px-5">
        <div class="text-xs">
            <a
                href="https://github.com/nokotan8/portfolio"
                target="_blank"
                class="text-xs">Source</a
            >
            <span class="text-dark-muted">|</span> Theme:
            <a
                href="https://rosepinetheme.com/palette/"
                target="_blank"
                class="text-xs">Rosé Pine</a
            >
        </div>
        <span class="flex flex-row gap-2 text-sm">
            <a href="https://github.com/nokotan8" target="_blank">GitHub</a>
            <span class="text-dark-muted">|</span>
            <button
                class="tooltip hover:text-dark-text"
                onclick={() => copy_discord_user("fancywhal3")}
                >Discord
                <span id="discord-tooltip" class="tooltip-text">fancywhal3</span
                >
            </button>
            <span class="text-dark-muted">|</span>
            <a
                href="https://www.linkedin.com/in/justin-t-451667270/"
                target="_blank">LinkedIn</a
            >
        </span>
    </div>
</div>
