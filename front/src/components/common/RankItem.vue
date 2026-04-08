<template>
  <div class="rank-item van-hairline--bottom">
    <div class="rank-item__main" @click="$emit('click')">
      <div class="rank-item__rank" :class="rankClass">{{ rankValue }}</div>
      <div class="rank-item__content">
        <div class="rank-item__row">
          <div class="rank-item__name" :key="title" v-fontResize:[title]>{{ title }}</div>
          <div class="rank-item__extra">
            <slot name="extra" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { INTEGER_3 } from '@/utils/constant';

const props = defineProps({
  rank: { type: Number, required: true },
  title: { type: String, required: true }
});

defineEmits<{ (e: 'click'): void }>();

const rankClass = computed(() => {
  const n = props.rank + 1;
  return n <= INTEGER_3 ? `icon-ran-${n}` : 'rank-value';
});

const rankValue = computed(() => {
  const n = props.rank + 1;
  return n <= INTEGER_3 ? '' : n;
});
</script>

<style scoped lang="less">
.rank-item {
  margin: 0 10px;
  &:last-child::after {
    border-bottom: none;
  }

  &__main {
    display: flex;
    width: 100%;
    padding: 12px 0;
  }

  &__rank {
    padding: 3px 0;
    width: 16px;
    height: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    margin-right: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
  }

  &__content {
    width: 100%;
  }

  &__row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__name {
    white-space: nowrap;
    padding-right: 8px;
    box-sizing: border-box;
    overflow: hidden;
    width: 132px;
    font-size: 17px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.84);
  }

  &__extra {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }
}
</style>
