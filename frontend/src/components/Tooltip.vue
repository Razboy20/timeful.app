<template>
  <div class="tw-relative" ref="tooltipTrigger">
    <slot></slot>
    <div
      v-if="isVisible && activeContent"
      class="tw-pointer-events-none tw-fixed tw-z-50 tw-rounded-lg tw-bg-dark-gray tw-px-1.5 tw-py-1 tw-text-xs tw-text-white tw-shadow-lg tw-transition-opacity tw-duration-200"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }"
    >
      {{ activeContent }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      position: { x: 0, y: 0 },
      isVisible: false,
      showTimeout: null,
      internalContent: "",
    }
  },
  computed: {
    activeContent() {
      return this.internalContent || this.content
    },
  },
  watch: {
    activeContent: {
      handler(newContent) {
        if (this.showTimeout) {
          clearTimeout(this.showTimeout)
        }

        this.isVisible = false

        if (newContent) {
          this.showTimeout = setTimeout(() => {
            this.isVisible = true
          }, 700)
        }
      },
      immediate: true,
    },
  },
  methods: {
    setContent(text) {
      this.internalContent = text
    },
    handleMouseMove(e) {
      this.position = {
        x: e.clientX,
        y: e.clientY - 30,
      }
    },
    handleMouseEnter() {
      if (this.activeContent) {
        this.isVisible = true
      }
    },
    handleMouseLeave() {
      this.isVisible = false
    },
  },
  mounted() {
    if (this.$refs.tooltipTrigger) {
      this.$refs.tooltipTrigger.addEventListener(
        "mousemove",
        this.handleMouseMove
      )
      this.$refs.tooltipTrigger.addEventListener(
        "mouseenter",
        this.handleMouseEnter
      )
      this.$refs.tooltipTrigger.addEventListener(
        "mouseleave",
        this.handleMouseLeave
      )
    }
  },
  beforeDestroy() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout)
    }
    if (this.$refs.tooltipTrigger) {
      this.$refs.tooltipTrigger.removeEventListener(
        "mousemove",
        this.handleMouseMove
      )
      this.$refs.tooltipTrigger.removeEventListener(
        "mouseenter",
        this.handleMouseEnter
      )
      this.$refs.tooltipTrigger.removeEventListener(
        "mouseleave",
        this.handleMouseLeave
      )
    }
  },
}
</script>
