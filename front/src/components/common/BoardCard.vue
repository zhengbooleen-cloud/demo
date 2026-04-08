<template>
  <div class="board-card">
    <div v-if="title" class="board-card__title">{{ title }}</div>
    <div class="board-card__content" :class="{ 'board-card__content--loading': loading }">
      <slot v-if="!isEmpty" />
      <van-empty v-else :description="emptyText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EMPTY_TEXT, LOADING_TEXT } from '@/utils/constant';

const props = defineProps({
  title: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  isEmpty: { type: Boolean, default: false }
});

const emptyText = computed(() => (props.loading ? LOADING_TEXT : EMPTY_TEXT));
</script>

<style scoped lang="less">
.board-card {
  &__title {
    padding: 12px 12px 4px;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.84);
  }

  &__content {
    margin-top: -4px;
  }
}
</style>
