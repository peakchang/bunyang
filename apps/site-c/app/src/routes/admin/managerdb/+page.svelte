<script>
    import ManagerDb from "$core/components/admin/ManagerDb.svelte";
    let { data } = $props();
</script>

<ManagerDb siteData={data}></ManagerDb>
