import PuikProgressBar from './../src/progress-bar.vue'
import type { Meta, StoryFn, Args } from '@storybook/vue3'

export default {
  title: 'Components/ProgressBar',
  component: PuikProgressBar,
  argTypes: {
    percentage: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
  },
  args: {
    percentage: 50,
  },
} as Meta

const Template: StoryFn = (args: Args) => ({
  components: {
    PuikProgressBar,
  },
  setup() {
    return { args }
  },
  template: `<puik-progress-bar v-bind="args"/>`,
})

export const Default = {
  render: Template,
  args: {},

  parameters: {
    docs: {
      source: {
        code: `
  <!--VueJS Snippet-->
  <puik-progress-bar :percentage="50" />

  <!--HTML/CSS Snippet-->
  <div class="progress-bar__container">
    <div class="progress-bar__content" style="width: 50%;"></div>
  </div>
        `,
        language: 'html',
      },
    },
  },
}

export const Max = {
  render: Template,

  args: {
    percentage: 100,
  },

  parameters: {
    docs: {
      source: {
        code: `
  <!--VueJS Snippet-->
  <puik-progress-bar :percentage="100" />

  <!--HTML/CSS Snippet-->
  <div class="progress-bar__container">
    <div class="progress-bar__content" style="width: 100%;"></div>
  </div>
        `,
        language: 'html',
      },
    },
  },
}

export const Min = {
  render: Template,

  args: {
    percentage: 0,
  },

  parameters: {
    docs: {
      source: {
        code: `
  <!--VueJS Snippet-->
  <puik-progress-bar :percentage="0" />

  <!--HTML/CSS Snippet-->
  <div class="progress-bar__container">
    <div class="progress-bar__content" style="width: 0%;"></div>
  </div>
        `,
        language: 'html',
      },
    },
  },
}
