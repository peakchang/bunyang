<script>
    import AllDb from "@shared/core/src/components/admin/AllDb.svelte";
    let { data } = $props();
</script>

<AllDb siteData={data}></AllDb>
