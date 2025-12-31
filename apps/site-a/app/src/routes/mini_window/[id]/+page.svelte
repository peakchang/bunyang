<script>
    import MiniWindow from "@shared/core/src/components/admin/MiniWindow.svelte";
    let { data } = $props();
</script>

<MiniWindow siteData={data}></MiniWindow>
