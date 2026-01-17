<script>
    import MobileMain from "$lib/components/MobileMain.svelte";
    import PcMain from "$lib/components/PcMain.svelte";
    import { onMount } from "svelte";
    let { data } = $props();

    let isMobile = $derived(data.isMobile);
    // let isMobile = "mobile";
</script>

{#if isMobile}
    <MobileMain setData={data}></MobileMain>
{:else}
    <PcMain setData={data}></PcMain>
{/if}
