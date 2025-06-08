<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import "../app.css";
    import { fade_out, fade_in } from "$lib/fade.js";
    import { page_state } from "$lib/state.svelte.js";

    const is_on_page = (path: string): "dock-item-selected" | "" => {
        if (path === "")
            return page.url.pathname === `${base}/` ? "dock-item-selected" : "";
        return page.url.pathname.includes(path) ? "dock-item-selected" : "";
    };

    const animate_dock = (): "dock-float-in" | "" => {
        if (page_state.first_load) {
            page_state.first_load = false;
            return page.url.pathname === `${base}/` ? "dock-float-in" : "";
        }
        return "";
    };

    // If navigating to a different page on the same website,
    // fade in and out everything except the dock.
    const navigate = (e: Event, location: string) => {
        if (location !== page.url.pathname) {
            e.preventDefault();
            const body_except_dock =
                document.getElementById("body-except-dock");
            if (body_except_dock) {
                fade_out(body_except_dock, 100);
                setTimeout(() => {
                    goto(location);
                }, 160);
                setTimeout(() => {
                    fade_in(body_except_dock, 120);
                }, 230);
            }
        }
    };

    let { children } = $props();
</script>

<div
    class={"bg-dark-surface fixed bottom-0 left-0 z-50 w-full shadow-md backdrop-blur " +
        animate_dock()}
>
    <div
        class="text-dark-subtle mx-auto flex max-w-4xl items-center justify-around px-4 py-2"
    >
        <a
            onclick={(e) => navigate(e, base + "/")}
            href="{base}/"
            class={"dock-item " + is_on_page("")}>About</a
        >
        <a
            onclick={(e) => navigate(e, base + "/projects")}
            href="{base}/projects"
            class={"dock-item " + is_on_page("projects")}>Projects</a
        >
        <a
            onclick={(e) => navigate(e, base + "/uni")}
            href="{base}/uni"
            class={"dock-item " + is_on_page("uni")}>Uni</a
        >
        <a
            onclick={(e) => navigate(e, base + "/socials")}
            href="{base}/socials"
            class={"dock-item " + is_on_page("socials")}>Socials</a
        >
    </div>
</div>

<div id="body-except-dock">
    {@render children()}
</div>
