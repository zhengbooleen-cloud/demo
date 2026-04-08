import { Os } from '@/types/tools.d';

function getOS(): { sys: Os } {
  const sys: Os = /(iphone)|(mac)|(ipad)/gi.test(navigator.userAgent) ? Os.iphone : Os.gphone;
  return { sys };
}

/**
 * 判断机型（支持鸿蒙识别）
 */
function getCusPlatform(): 'gphone' | 'iphone' | 'harmony' | 'unknown' {
  const userAgent = navigator.userAgent.toLowerCase();
  const strategies = [
    { platform: 'harmony' as const, checkFn: () => userAgent.includes('harmony') },
    { platform: 'iphone' as const, checkFn: () => userAgent.includes('iphone') || userAgent.includes('ipad') },
    { platform: 'gphone' as const, checkFn: () => userAgent.includes('android') },
  ];
  for (const { platform, checkFn } of strategies) {
    if (checkFn()) {
      return platform;
    }
  }
  return 'unknown';
}

function androidCanBackProtocol() {
  if (/hexin/gi.test(navigator.userAgent) && getOS().sys === Os.gphone) {
    const data = {
      method: 'setBrowserField',
      params: {
        isUseDefaultBack: 'true'
      }
    };
    window.callNativeHandler('notifyWebHandleEvent', JSON.stringify(data));
  }
}

function setTitle(str: string) {
  document.title = str;
  if (/hexin/gi.test(navigator.userAgent)) {
    if (navigator.userAgent.toLowerCase().indexOf('android') > 0) {
      window.callNativeHandler(
        'changeWebViewTitle',
        {
          title: str,
          url: ''
        },
        function () {
          // 客户端协议空函数
        }
      );
    } else {
      window.callNativeHandler('updateTitleAutomatically');
    }
  }
}

/**
 * 改变安卓 WebView 状态栏颜色
 */
function changeWebViewTitleColor() {
  const platform = getCusPlatform();
  if (platform === 'iphone') {
    return;
  }
  if (!/hexin/gi.test(navigator.userAgent)) {
    return;
  }
  window.callNativeHandler(
    'insuranceWebHandle',
    {
      statusBarFontStyle: '0',
      isHideTitle: 'true',
      isHideStatus: 'true',
    },
    () => {
      // 客户端协议回调函数
    }
  );
}

export {
  androidCanBackProtocol,
  setTitle,
  getCusPlatform,
  changeWebViewTitleColor
};
