<script>
    import AdminMain from "$core/components/admin/AdminMain.svelte";

    let { data } = $props();
    console.log(data);
</script>

<AdminMain formStatusData={data.formStatusData}></AdminMain>
