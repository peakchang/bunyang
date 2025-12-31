<script>
    import DbCount from "$core/components/admin/DbCount.svelte";
    let { data } = $props();
</script>

<DbCount siteData={data}></DbCount>
