import { DirectiveBinding } from 'vue';
import type { ObjectDirective, DirectiveHook } from 'vue';
import { judgeIsNull } from '@/utils/tools';

/**
 * 红绿色指令，根据正负数改变颜色
 * 使用方式：v-hxm-redgreen:[param]
 * @param el HTMLElement
 * @param binding DirectiveBinding
 * @returns void
 */
const redGreenHandler = function (el: HTMLElement, binding: DirectiveBinding<string>) {
  const currentNumber = parseFloat(binding.value || '');
  if (judgeIsNull(currentNumber) === '--') {
    el.classList.remove('hxm-green');
    el.classList.remove('hxm-red');
    return;
  }

  if (currentNumber > 0) {
    el.classList.remove('hxm-green');
    el.classList.add('hxm-red');
  } else if (currentNumber < 0) {
    el.classList.remove('hxm-red');
    el.classList.add('hxm-green');
  } else {
    el.classList.remove('hxm-red');
    el.classList.remove('hxm-green');
    el.classList.add('hxm-normal');
  }
};

export const redGreen: ObjectDirective = {
  bind: redGreenHandler as DirectiveHook,
  componentUpdated: redGreenHandler as DirectiveHook
};
