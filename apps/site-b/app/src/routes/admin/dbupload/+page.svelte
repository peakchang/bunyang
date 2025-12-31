<script>
    import DbUpload from "$core/components/admin/DbUpload.svelte";
    let { data } = $props();
</script>

<DbUpload siteData={data}></DbUpload>
