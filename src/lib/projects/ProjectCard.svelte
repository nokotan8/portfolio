<script lang="ts">
    let this_card: HTMLElement;
    const expand = (card: HTMLElement) => {
        card.classList.toggle("project-card-expanded");
    };
</script>

<button
    class="project-card bg-dark-surface h-[10rem] w-[40rem] rounded-lg shadow-md/15 flex flex-col p-3"
    bind:this={this_card}
    onclick={() => expand(this_card)}
>
    <div class="summary">sdf</div>

    <div class="details"></div>
</button>
