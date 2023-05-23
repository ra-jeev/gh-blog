<script setup lang="ts">
const isAdmin = useState('isAdmin', () => false);

const user = useCurrentUser();

onMounted(() => {
  watch(user, async (user) => {
    if (user) {
      // user logged in
      const res = await user.getIdTokenResult();

      if (res.claims.roles && res.claims.roles.includes('ADMIN')) {
        isAdmin.value = true;
      }
    } else {
      isAdmin.value = false;
    }
  });
});
</script>

<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>
