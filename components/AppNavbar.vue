<script lang="ts" setup>
const { navigation } = useContent();
const appConfig = useAppConfig();
const config = useRuntimeConfig();

const admin = useState('isAdmin');

const createNewPost = async () => {
  const auth = useFirebaseAuth();
  const idToken = await auth?.currentUser?.getIdToken();
  if (idToken) {
    const res = await fetch(config.public.START_CODESPACE_FN_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      window.open(data.web_url, '_blank');
    }
  }
};
</script>

<template>
  <div class="flex justify-between max-w-3xl px-4 py-4 mx-auto sm:px-8">
    <!-- Navigation -->
    <div class="text-primary-700 dark:text-primary-200">
      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        active-class="font-bold"
        class="mr-6"
      >
        {{ link.title }}
      </NuxtLink>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-4 transition text-primary-500">
      <a
        v-if="appConfig.socials?.twitter"
        :href="`https://twitter.com/${appConfig.socials?.twitter}`"
        title="Twitter"
        class="dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300"
        ><Icon name="fa-brands:twitter" class="w-5 h-5"
      /></a>
      <a
        v-if="appConfig.socials?.github"
        :href="`https://github.com/${appConfig.socials?.github}`"
        title="GitHub"
        class="dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300"
        ><Icon name="fa-brands:github" class="w-5 h-5"
      /></a>
      <ColorModeSwitch
        class="dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300"
      />
      <button
        v-if="admin"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="createNewPost()"
      >
        New Post
      </button>
    </div>
  </div>
</template>
