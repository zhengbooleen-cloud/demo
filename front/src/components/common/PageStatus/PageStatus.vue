<template>
  <div
    v-show="pageStatus"
    class="hxm-page-status hxmui-fontsize-adapter"
    :style="{ 'z-index': zIndex }"
  >
    <div v-show="pageStatus === 'loading'" :class="getBemClass('loading')">
      <div :class="getBemClass('logo-loading')" v-if="loadingType === 'logo'">
        <div class="logo"></div>
        <div class="light"></div>
      </div>
      <div :class="getBemClass('spinner-loading')" v-else>
        <div :class="getBemClass('loadingtext')">
          <van-loading type="spinner" color="#00000066" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const bem = 'hxm-page-status';
const BODY_LOCK_CLASS = 'hxm-overflow-hidden';
export default {
  name: 'PageStatus',
  data() {
    return {
      pageStatus: '',
      // loading状态 'logo' | 'spinner';
      loadingType: 'logo',
      zIndex: 96
    };
  },
  watch: {
    pageStatus(val) {
      val ? this.addBodyLock() : this.removeBodyLock();
    }
  },
  beforeDestroy() {
    this.removeBodyLock();
  },
  methods: {
    addBodyLock() {
      document.body.classList.add(BODY_LOCK_CLASS);
    },
    removeBodyLock() {
      document.body.classList.remove(BODY_LOCK_CLASS);
    },
    loading(opts) {
      this.pageStatus = 'loading';
      this.loadingType = opts?.type || 'logo';
    },
    close() {
      this.pageStatus = '';
    },
    getBemClass(options) {
      return `${bem}__${options}`;
    }
  }
};
</script>
<style lang="less" scoped>
.hxm-page-status {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: rgba(0,0,0,0.84);

  &__loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__logo-loading {
    position: relative;
    width: 120px;
    height: 28px;
    overflow: hidden;

    .logo {
      width: 100%;
      height: 100%;
      background: url('./images/logo_light.png') center center;
      background-size: cover;
    }

    .light {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 98px;
      height: 68px;
      background: url('./images/light.png') center center;
      background-size: cover;
      opacity: 0.6;
      animation: move 0.8s ease-in-out infinite;
    }
  }

  &__loadingtext {
    display: flex;
    align-items: center;
    margin-top: 12px;

    p {
      margin-left: 120px;
      font-size: 20px;
    }
  }
}

@keyframes move {
  0% {
    transform: translate(-196px, -50%);
  }

  100% {
    transform: translate(294px, -50%);
  }
}

.hxm-page-status {
  &__loading {
    margin-bottom: env(safe-area-inset-bottom);
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
}
</style>
