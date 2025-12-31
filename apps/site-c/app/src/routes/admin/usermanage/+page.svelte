<script>
    import UserManage from "$core/components/admin/UserManage.svelte";
    let { data } = $props();
</script>

<UserManage siteData={data} />
