import { ref } from 'vue'
import PuikIcon from '../../icon/src/icon.vue'
import {
  PuikTabNavigation,
  PuikTabNavigationGroupTitles,
  PuikTabNavigationGroupPanels,
  PuikTabNavigationTitle,
  PuikTabNavigationPanel,
} from '..'
import type { Meta, StoryFn, Args, StoryObj } from '@storybook/vue3'

const meta: Meta<
  | typeof PuikTabNavigation
  | typeof PuikTabNavigationGroupTitles
  | typeof PuikTabNavigationGroupPanels
  | typeof PuikTabNavigationTitle
  | typeof PuikTabNavigationPanel
> = {
  title: 'Components/TabNavigation',
  component: PuikTabNavigation,
  argTypes: {
    name: {
      description:
        "Prop which will correspond to the component's html id attribute. NB: must not start with a number",
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'none',
        },
      },
    },
    defaultPosition: {
      description:
        'Default position of the selected tab. NB: the minimum value cannot be less than 1 ',
      control: { type: 'number', min: 1 },
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: 1,
        },
      },
    },
    ariaLabel: {
      description: 'value of aria-label attribute',
      control: 'text',
      table: {
        disable: true,
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'none',
        },
      },
    },
    position: {
      description:
        'position of tab inside PuiktabNavigationGroupTitles component. NB: must be greater than 1',
      table: {
        disable: true,
      },
    },
    disabled: {
      description: 'disable a navigation tab',
      control: 'boolean',
      table: {
        disable: true,
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
}

export default meta
type Story = StoryObj<
  | typeof PuikTabNavigation
  | typeof PuikTabNavigationGroupTitles
  | typeof PuikTabNavigationGroupPanels
  | typeof PuikTabNavigationTitle
  | typeof PuikTabNavigationPanel
>

const Template: StoryFn = (args: Args) => ({
  components: {
    PuikIcon,
    PuikTabNavigation,
    PuikTabNavigationGroupTitles,
    PuikTabNavigationGroupPanels,
    PuikTabNavigationTitle,
    PuikTabNavigationPanel,
  },
  setup() {
    const tabs = ref([
      { name: 'title-1', content: 'content 1' },
      { name: 'title-2', content: 'content 2' },
      { name: 'title-3', content: 'content 3' },
    ])
    return { tabs, args }
  },
  template: `
<puik-tab-navigation :name="args.name" :default-position="args.defaultPosition">
  <puik-tab-navigation-group-titles :aria-label="args.ariaLabel">
    <template v-for="(tab, index) in tabs" :key="index">
      <puik-tab-navigation-title :position="index + 1" :disabled="tab?.disabled">
        {{ tab?.name }}
      </puik-tab-navigation-title>
    </template>
  </puik-tab-navigation-group-titles>
  <puik-tab-navigation-group-panels>
    <template v-for="(tab, index) in tabs" :key="index">
      <puik-tab-navigation-panel :position="index + 1">
        {{ tab?.content }}
      </puik-tab-navigation-panel>
    </template>
  </puik-tab-navigation-group-panels>
</puik-tab-navigation>
`,
})

export const Default: Story = {
  args: {
    name: 'name-example',
    defaultPosition: 1,
    ariaLabel: 'aria-label-example',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story:
          'NB: The id attribute of the component corresponds to the prop name (allows you to identify each instance of the navigation component in the event that there are several on the same page)',
      },
      source: {
        code: `
<!--VueJS Snippet-->
<puik-tab-navigation :name="args.name" :default-position="args.defaultPosition">
  <puik-tab-navigation-group-titles :aria-label="args.ariaLabel">
    <template v-for="(tab, index) in tabs" :key="index">
      <puik-tab-navigation-title :position="index + 1" :disabled="tab?.disabled">
        {{ tab?.name }}
      </puik-tab-navigation-title>
    </template>
  </puik-tab-navigation-group-titles>
  <puik-tab-navigation-group-panels>
    <template v-for="(tab, index) in tabs" :key="index">
      <puik-tab-navigation-panel :position="index + 1">
        {{ tab?.content }}
      </puik-tab-navigation-panel>
    </template>
  </puik-tab-navigation-group-panels>
</puik-tab-navigation>

<!--HTML/CSS Snippet-->
<!--NB: the id attribute of the component corresponds to the prop name (allows you to identify each instance of the navigation component in the event that there are several on the same page)-->
<div id="name-example" class="puik-tab-navigation"></div>
`,
        language: 'html',
      },
    },
  },
}
