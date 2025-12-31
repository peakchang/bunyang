<script>
    import { fly } from "svelte/transition";
    import { fade } from "svelte/transition";

    let bgArea;
    export let width = 200;
    export let bgGray = true;
    export let drawerOpen = true;
    export let autoOutBackground = true;

    console.log(width);

    function bgClickFunc(e) {
        if (bgArea == e.target && autoOutBackground) {
            drawerOpen = false;
        }
    }
</script>

<svelte:window on:click={bgClickFunc} />
{#if drawerOpen}
    {#if bgGray}
        <div
            bind:this={bgArea}
            class="fixed z-550 top-0 left-0 w-full h-full bg-black opacity-15"
            transition:fade={{ delay: 100, duration: 100 }}
        ></div>
    {/if}
    <div
        class="fixed top-0 left-0 z-600 bg-white overflow-y-auto dark:bg-gray-800 inset-y-0 suit-font"
        style="width:{width}px; padding:16px; height: 100vh; border-right: 1px solid #e7e5e4;"
        transition:fly={{ duration: 200, x: -width, opacity: 0.5 }}
    >
        <slot />
    </div>
{/if}
