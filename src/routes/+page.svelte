<script lang="ts">
    import { page_state } from "$lib/state.svelte.js";
    const animate_about_me = (item: string): string => {
        if (page_state.first_load) {
            if (item == "about-me") return "about-me-float-in";
            else if (item == "name") return "name-float-in";
            else return "";
        }

        return "";
    };
</script>

<div id="about-me" class="text-dark-text mt-[25vh] flex flex-col gap-4">
    <h1 class={"mb-3 text-5xl font-bold " + animate_about_me("name")}>
        Hi, I'm Justin.
    </h1>
    <div class={"text-md flex flex-col gap-2 " + animate_about_me("about-me")}>
        <p><span class="text-dark-rose font-bold">University:</span> UNSW</p>
        <p>
            <span class="text-dark-rose font-bold">Degree:</span> Computer Science
        </p>
        <p><span class="text-dark-rose font-bold">Interests:</span></p>
        <ul class="flex flex-col gap-0.5 indent-5">
            <li>Web application security</li>
            <li>Concurrent / parallel computing</li>
            <li>Cryptographic hashing</li>
            <li>Computing algorithms</li>
            <li>Games with parry mechanics</li>
            <li>Manga</li>
            <li>Badminton</li>
        </ul>
        I use Arch btw
    </div>
</div>
