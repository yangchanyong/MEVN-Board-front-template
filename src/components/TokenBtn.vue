<template>
  <button
    class="btn btn-sm btn-info mb-0"
    @click="refreshChk"
  >
    123
  </button>
</template>
<script>

import MaterialButton from "@/components/MaterialButton.vue";
import { useStore } from 'vuex'
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const accessToken = computed(() => store.state.accessToken)
    const refreshChk = () => {
      alert(`저장된 값 : ${accessToken.value}`);
    }

    return {accessToken, refreshChk}
  }
}
</script>

<style scoped>

</style>