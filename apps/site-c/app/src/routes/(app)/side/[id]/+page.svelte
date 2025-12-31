<script>
    import MiniSiteView from "@shared/core/src/components/components/MiniSiteView.svelte";
    let { data } = $props();
</script>

<MiniSiteView siteData={data}></MiniSiteView>
