import {
  MenuAlignEnum,
  menuAlignValues,
  MenuPositionEnum,
  menuPositionValues,
} from '../src/menu'
import PuikMenu from '../src/menu.vue'
import PuikMenuItem from '../src/menu-item.vue'
import PuikMenuItemSeparator from '../src/menu-item-separator.vue'
import PuikButton from '../../button/src/button.vue'
import type { Meta, Args, Story } from '@storybook/vue3'

const menuAlignsJoined = menuAlignValues.join('|')
const menuPositionsJoined = menuPositionValues.join('|')

export default {
  title: 'Components/Menu',
  component: PuikMenu,
  argTypes: {
    position: {
      description: 'Menu position',
      control: 'select',
      options: menuPositionValues,
      table: {
        defaultValue: {
          summary: MenuPositionEnum.BOTTOM,
        },
        type: {
          summary: menuPositionsJoined,
        },
      },
    },
    align: {
      description: 'Menu alignment',
      control: 'select',
      options: menuAlignValues,
      table: {
        defaultValue: {
          summary: MenuAlignEnum.LEFT,
        },
        type: {
          summary: menuAlignsJoined,
        },
      },
    },
    maxHeight: {
      control: 'text',
      description: 'Menu max height',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
    width: {
      control: 'text',
      description: 'Menu width',
      table: {
        defaultValue: {
          summary: '200px',
        },
      },
    },
    trigger: {
      control: 'none',
      description: 'Trigger used to show or hide menu',
    },
    default: {
      control: 'none',
      description: 'Menu content',
    },
  },
  args: {
    width: '200px',
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as Meta

const Template: Story = (args: Args) => ({
  args: {},
  components: {
    PuikButton,
    PuikMenu,
    PuikMenuItem,
    PuikMenuItemSeparator,
  },
  setup() {
    return { args }
  },
  template: `
  <puik-menu v-bind="args">
    <template #trigger>
      <puik-button>Show menu</puik-button>
    </template>

    <template #default="{ close }">
      <h4 class="puik-h4">
        First section title
      </h4>
      <puik-menu-item>
        <puik-button variant="text">
          Item
        </puik-button>
      </puik-menu-item>
      <puik-menu-item>
        <puik-button variant="text" left-icon="home">
          Item with icon
        </puik-button>
      </puik-menu-item>

      <puik-menu-item-separator />

      <h4 class="puik-h4">
        Second section title
      </h4>
      <p>
        Information text
      </p>
      <puik-menu-item>
        <puik-button variant="destructive" left-icon="delete" @click="close">
          Destructive item
        </puik-button>
      </puik-menu-item>

      <puik-menu-item-separator />

      <h4 class="puik-h4">
        Third section title
      </h4>
      <puik-menu-item>
        <puik-button variant="text" disabled>
          Disabled item
        </puik-button>
      </puik-menu-item>
    </template>
  </puik-menu>
    `,
})

export const Default = Template.bind({})
Default.args = {
  maxHeight: 'none',
  position: MenuPositionEnum.BOTTOM,
  align: MenuAlignEnum.LEFT,
}
Default.parameters = {
  docs: {
    source: {
      code: `
<!--VueJS Snippet-->
<!--
  $aligns: ${menuAlignsJoined}
  $positions: ${menuPositionsJoined}
-->
<puik-menu
  :align="$aligns"
  :position="$position"
  :width="width"
  :max-height="maxHeight"
>
  <template #trigger>
    <puik-button>Show menu</puik-button>
  </template>

  <template #default="{ close }">
    <h4 class="puik-h4">
      First section title
    </h4>
    <puik-menu-item>
      <puik-button variant="text">
        Item
      </puik-button>
    </puik-menu-item>
    <puik-menu-item>
      <puik-button variant="text" left-icon="home">
        Item with icon
      </puik-button>
    </puik-menu-item>

    <puik-menu-item-separator />

    <h4 class="puik-h4">
      Second section title
    </h4>
    <p>
      Information text
    </p>
    <puik-menu-item>
      <puik-button variant="destructive" left-icon="delete" @click="close">
        Destructive item
      </puik-button>
    </puik-menu-item>
  </template>
</puik-menu>

<!--HTML/CSS Snippet-->
<!--
  State classes
  Hide menu: "puik-menu--invisible"
-->
<!--
  $aligns: ${menuAlignsJoined}
  $positions: ${menuPositionsJoined}
-->
<div class="puik-menu puik-menu--position-bottom puik-menu--align-left">
  <button class="puik-button puik-button--primary puik-button--md puik-menu__trigger" aria-expanded="true" type="button" aria-controls="menu-id">
    Show menu
  </button>
  <!--
    Menu content transition

    Enter active: "puik-menu__transition__enter--active"
    Enter from: "puik-menu__transition__enter--from"
    Enter to: "puik-menu__transition__enter--to"

    Leaving enter: puik-menu__transition__leave--active"
    Leaving from: "puik-menu__transition__leave--from"
    Leaving to: "puik-menu__transition__leave--to"
  -->
  <div class="puik-menu__content" id="menu-id" tabindex="-1" style="max-height: none; width: 200px;">
    <h4 class="puik-h4"> First section title </h4>
    <div class="puik-menu-item">
      <button class="puik-button puik-button--text puik-button--md">
        Item
      </button>
    </div>
    <div class="puik-menu-item">
      <button class="puik-button puik-button--text puik-button--md">
        <div class="puik-icon material-icons-round puik-button__left-icon" style="font-size: 1.25rem;">home</div> Item with icon
      </button>
    </div>
    <div class="puik-menu-item">
      <hr class="puik-menu-item-separator">
    </div>
    <h4 class="puik-h4"> Second section title </h4>
    <p> Information text </p>
    <div class="puik-menu-item">
      <button class="puik-button puik-button--destructive puik-button--md">
        <div class="puik-icon material-icons-round puik-button__left-icon" style="font-size: 1.25rem;">delete</div> Destructive item
      </button>
    </div>
  </div>
</div>
      `,
      language: 'html',
    },
  },
}
