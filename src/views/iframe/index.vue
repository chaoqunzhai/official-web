<template>
  <n-spin :show="loading">
    <div class="iframe-container">
      <iframe :src="frameSrc || props.src" class="frame-iframe" ref="frameRef"></iframe>
    </div>
  </n-spin>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted, nextTick, defineProps } from 'vue';
  import { useRoute } from 'vue-router';

  const currentRoute = useRoute();
  const loading = ref(false);
  const frameRef = ref<HTMLFrameElement | null>(null);
  const frameSrc = ref<string>('');
  const props = defineProps<{
    src?: string;
  }>();

  if (unref(currentRoute.meta)?.frameSrc) {
    frameSrc.value = unref(currentRoute.meta)?.frameSrc as string;
  }

  function hideLoading() {
    loading.value = false;
  }

  function init() {
    nextTick(() => {
      const iframe = unref(frameRef);
      if (!iframe) return;
      const _frame = iframe as any;
      if (_frame.attachEvent) {
        _frame.attachEvent('onload', () => {
          hideLoading();
        });
      } else {
        iframe.onload = () => {
          hideLoading();
        };
      }
    });
  }

  onMounted(() => {
    loading.value = true;
    init();
  });

  function open(src: string) {
    frameSrc.value = src;
  }

  defineExpose({
    open,
  });
</script>

<style lang="less" scoped>
  //.frame {
  //  width: 100%;
  //  //height: 100vh;
  //
  //  &-iframe {
  //    width: 100%;
  //    height: 100%;
  //    overflow: hidden;
  //    border: 0;
  //    box-sizing: border-box;
  //  }
  //}
  .iframe-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  .iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>
