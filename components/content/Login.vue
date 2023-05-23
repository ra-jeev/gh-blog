<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
const googleAuthProvider = new GoogleAuthProvider();

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

function logOut() {
  if (auth) {
    signOut(auth);
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center px-4 py-4">
    <template v-if="user">
      <p>
        You're signed in as:<strong class="ml-2">{{ user.displayName }}</strong>
      </p>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="logOut()"
      >
        Sign Out
      </button>
    </template>
    <template v-else>
      <p>Sign in for starting Github Codespaces from here</p>
      <small class="text-gray-400">
        * You must have "ADMIN" credentials to do so.
      </small>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="signInPopup()"
      >
        Sign In
      </button>
    </template>
  </div>
</template>
