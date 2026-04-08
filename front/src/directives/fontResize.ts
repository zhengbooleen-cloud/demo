import type { ObjectDirective, DirectiveHook } from 'vue';
import { FIXED_PLACE, UPDATE_TIME_OUT, DEFAULT_SIZE } from '@/utils/constant';

interface Binding {
  value: any;
  arg: any;
}

interface ComputedStyle extends CSSStyleDeclaration {
  'font-size': string;
  'margin-right': string;
}

/**
 * 字体缩小指令，计算文字缩小时修改
 * 使用方法：v-hxm-fontResize="{minSize:6}"
 * @param el HTMLElement
 * @param binding Binding
 * @returns void
 */
const fontResizeHandler = function (el: HTMLElement, binding: Binding) {
  el.classList.remove('van-ellipsis');
  let originSize = el.getAttribute('origin-fontsize');
  if (!originSize) {
    const tmpSize: any = (getComputedStyle(el, '') as ComputedStyle)['font-size'];
    originSize = tmpSize;
    el.setAttribute('origin-fontsize', String(originSize));
  }
  el.style.fontSize = `${originSize}px`;

  if (!originSize) {
    return;
  }
  // 不涉及缩小
  if (el.scrollWidth - el.offsetWidth <= 0) {
    el.style.fontSize = `${originSize}px`;
    return;
  }
  const dpr = document.documentElement.getAttribute('data-dpr');
  // 计算缩小比例
  const overflowrate = Number(
    Number(1 + (el.scrollWidth - el.offsetWidth) / el.offsetWidth).toFixed(FIXED_PLACE)
  );
  const fontsize = parseFloat((getComputedStyle(el, '') as ComputedStyle)['font-size']);
  const minSize = Number(dpr) * (binding.value && binding.value.minSize) || DEFAULT_SIZE;

  let newSize;
  newSize = fontsize / overflowrate;
  // 设置对应缩小字体
  if (newSize < minSize) {
    newSize = minSize;
    el.classList.add('van-ellipsis');
  }
  el.style.fontSize = `${newSize}px`;
};

const fontSizeDirectiveHandler = function (el: HTMLElement, binding: Binding) {
  // 延迟执行，等待dom渲染完成、避免同步阻塞渲染
  setTimeout(() => {
    fontResizeHandler(el, binding);
  }, UPDATE_TIME_OUT);
};

export const fontResize: ObjectDirective = {
  bind: fontSizeDirectiveHandler as DirectiveHook,
  componentUpdated: fontSizeDirectiveHandler as DirectiveHook
};
