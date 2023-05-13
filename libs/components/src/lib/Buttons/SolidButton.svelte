<script lang="ts">
    export let message: string = "hello there!";
</script>

<button>
    { message }
</button>

<style>
    button {
        @apply rounded-full bg-red-500 px-5 py-2;
    }
</style>