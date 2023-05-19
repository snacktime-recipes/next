<!-- Header -->
<header class="fixed inset-x-0 top-0 w-full py-4 px-6 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 bg-opacity-50">
    <!-- Logotype -->
    <div class="md:w-1/6 flex items-center">
        <img src="https://em-content.zobj.net/thumbs/120/apple/354/shallow-pan-of-food_1f958.png" class="w-8 h-8" alt="">

        <span class="text-xl text-zinc-950 dark:text-zinc-100 ml-3">Snacktime</span>
    </div>

    <!-- Links -->
    <div class="hidden md:block rounded-full bg-zinc-100 dark:bg-zinc-900 px-5 py-2">
        { #each ["Products", "Recipes", "Out story"] as link }
            <a href="/" class="text-zinc-600 dark:text-zinc-400 mx-4">{ link }</a>
        { /each }
    </div>

    <!-- Login button -->
    <div class="md:w-1/6 flex justify-end">
        <button class="rounded-full px-5 py-2 bg-zinc-100 dark:bg-zinc-900">
            <p class="text-zinc-600 dark:text-zinc-400">Login</p>
        </button>
    </div>
</header>