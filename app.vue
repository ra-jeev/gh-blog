<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const googleAuthProvider = new GoogleAuthProvider();

const isAdmin = useState('isAdmin', () => false);

const auth = useFirebaseAuth();
const user = useCurrentUser();

async function signInPopup() {
  if (auth) {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err: any) {
      console.log(`failed to sign in:`, err);
    }
  }
}

onMounted(() => {
  watch(user, async (user, prevUser) => {
    if (user) {
      // user logged in
      const res = await user.getIdTokenResult();

      if (res.claims.roles && res.claims.roles.includes('ADMIN')) {
        isAdmin.value = true;
      }
    }
  });
});
</script>

<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>
