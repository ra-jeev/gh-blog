<template>
  <div>
    <div
      class="max-w-2xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-primary-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg"
    >
      <main class="max-w-none">
        <slot />
      </main>
    </div>
    <div
      class="max-w-2xl px-4 py-10 mt-5 m-auto bg-white sm:px-8 sm:shadow dark:bg-primary-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg"
    >
      <h2>The app footer</h2>
    </div>
  </div>
</template>
