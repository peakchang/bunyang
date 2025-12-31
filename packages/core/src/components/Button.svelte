<script>
    export let label = "버튼dldpdy!!!";
    export let variant = "primary"; // primary, outline 등
</script>

<button
    class={`px-4 py-2 rounded-md text-sm font-semibold
    ${variant === "primary" ? "bg-black text-white" : "border border-gray-400"}`}
    on:click={() => {
        console.log("aslijdflaisjfliajsdf");
    }}
>
    {label}
</button>
