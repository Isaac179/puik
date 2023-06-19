import { ref } from 'vue'
import { faker } from '@faker-js/faker'
import PuikBadge from '../../badge/src/badge.vue'
import PuikButton from '../../button/src/button.vue'
import PuikSwitch from '../../switch/src/switch.vue'
import PuikTable from './../src/table.vue'
import type { PuikTableHeader } from '../src/table'
import type { Meta, Story, Args } from '@storybook/vue3'

function generateData(length = 10) {
  return Array(length)
    .fill(null)
    .map(() => {
      const firstname = faker.name.firstName()
      const lastname = faker.name.lastName()
      const email = `${lastname}.${firstname}@email.com`.toLowerCase()

      return {
        firstname,
        lastname,
        email,
        age: faker.random.numeric(2),
      }
    })
}

export default {
  title: 'Components/Table',
  component: PuikTable,
  argTypes: {
    items: {
      control: 'none',
      description: 'Table items',
      table: {
        defaultValue: {
          summary: '[]',
        },
        type: { summary: 'any[]' },
      },
    },
    headers: {
      control: 'none',
      description: 'Table headers',
      table: {
        type: {
          summary: 'PuikTableHeader[]',
          detail: `
  import type { PuikTableHeader } from '@prestashopcorp/puik/es/components/table/src/table'

  interface PuikTableHeader {
    text: string | undefined
    value: string
    size: 'sm' | 'md' | 'lg' | undefined
    width: string | undefined
    align: 'left' | 'center' | 'right' | undefined
  }
  `,
        },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Add col with checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selection: {
      control: 'none',
      description: 'v-model of the selected rows',
      table: {
        defaultValue: {
          summary: '[]',
        },
        type: {
          summary: 'number[]',
        },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Set the table width at 100%',
      table: {
        defaultValue: {
          summary: false,
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    '`header-${header.value}`': {
      control: 'none',
      description: 'Slot to replace header',
      table: {
        type: {
          summary: 'SlotProps',
          detail: `
{
  header: PuikTableHeader
  index: number
}
          `,
        },
      },
    },
    '`item-${header.value}`': {
      control: 'none',
      description: 'Slot to replace item',
      table: {
        type: {
          summary: 'SlotProps',
          detail: `
{
  item: any
  index: number
}
          `,
        },
      },
    },
  },
  args: {
    selectable: false,
    fullWidth: false,
  },
} as Meta

const headers: PuikTableHeader[] = [
  {
    text: 'Nom',
    value: 'lastname',
    size: 'md',
  },
  {
    text: 'Prénom',
    value: 'firstname',
    size: 'md',
  },
  {
    text: 'Age',
    value: 'age',
    size: 'sm',
    align: 'center',
  },
  {
    text: 'Status',
    value: 'status',
    size: 'sm',
  },
  {
    text: 'Email',
    value: 'email',
    align: 'right',
  },
  {
    value: 'actions',
    size: 'sm',
  },
]
const Template: Story = (args: Args) => ({
  components: {
    PuikTable,
    PuikBadge,
    PuikButton,
    PuikSwitch,
  },
  setup() {
    const itemCount = 5
    const items = generateData(itemCount)
    const switchState = ref(Array(itemCount).fill(false))
    const selection = ref([])
    return { args, headers, items, selection, switchState }
  },
  template: `<puik-table v-model:selection="selection" :headers="headers" :items="items" v-bind="args">
    <template #item-value1="{ item }">
      <puik-badge>
        {{ item.value1 }}
      </puik-badge>
    </template>
    <template #item-actions="{ item }">
      <puik-button
        variant="text"
        right-icon="delete"
        aria-label="Delete item"
      ></puik-button>
    </template>
    <template #item-status="{ index }">
      <puik-switch v-model="switchState[index]"></puik-switch>
    </template>
  </puik-table>`,
})

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  docs: {
    source: {
      code: `
<!--VueJS Snippet-->
const headers: PuikTableHeader[] = [
  {
    text: 'Nom',
    value: 'lastname',
    size: 'md',
  },
  {
    text: 'Prénom',
    value: 'firstname',
    size: 'md',
  },
  {
    text: 'Age',
    value: 'age',
    size: 'sm',
    align: 'center',
  },
  {
    text: 'Email',
    value: 'email',
    align: 'right',
  },
  {
    value: 'actions',
    size: 'sm',
  },
]

<puik-table
  v-model:selection="selection"
  :headers="headers"
  :items="items"
>
  <template #item-actions="{ item }">
    <puik-button
      variant="text"
      right-icon="delete"
      aria-label="Delete item"
    ></puik-button>
  </template>
  <template #item-status="{ index }">
    <puik-switch v-model="switches[index]"></puik-switch>
  </template>
</puik-table>

<!--HTML/CSS Snippet-->
<div class="puik-table__container">
  <!--
    Full width: "puik-table--full-width"

    th :
      size sm: "puik-table__head__row__item--sm"
      size md: "puik-table__head__row__item--md"
      size lg: "puik-table__head__row__item--lg"
    td :
      align left: "puik-table__body__row__item--left"
      align center: "puik-table__body__row__item--center"
      align right: "puik-table__body__row__item--right"
  -->
  <table class="puik-table">
    <thead>
      <tr>
        <th class="puik-table__head__row__item--selection">
          <div class="puik-checkbox puik-table__head__row__item--selection__checkbox">
            <input id="puik-checkbox-6915" class="puik-checkbox__input" type="checkbox">
            <label for="puik-checkbox-6915" class="puik-checkbox__label">Select all items</label>
          </div>
        </th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Age</th>
        <th>Status</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="puik-table__body__row__item--selection">
          <div class="puik-checkbox puik-table__body__row__item--selection__checkbox">
            <input id="puik-checkbox-7394" class="puik-checkbox__input" type="checkbox">
            <label for="puik-checkbox-7394" class="puik-checkbox__label">Select item</label>
          </div>
        </td>
        <td>Robel</td>
        <td>Alberto</td>
        <td>60</td>
        <td>
          <div class="puik-switch__group">
            <button class="puik-switch" id="headlessui-switch-6" role="switch" type="button" tabindex="0" aria-checked="false" data-headlessui-state="">
              <span class="puik-switch__toggle"></span>
            </button>
          </div>
        </td>
        <td>robel.alberto@email.com</td>
        <td>
          <button class="puik-button puik-button--text puik-button--md" aria-label="Delete item">
            <div class="puik-icon material-icons-round puik-button__right-icon" style="font-size: 1.25rem;">delete</div>
          </button>
        </td>
      </tr>
      <tr>
        <td class="puik-table__body__row__item--selection">
          <div class="puik-checkbox puik-table__body__row__item--selection__checkbox">
            <input id="puik-checkbox-3889" class="puik-checkbox__input" type="checkbox">
            <label for="puik-checkbox-3889" class="puik-checkbox__label">Select item</label>
          </div>
        </td>
        <td>Toy</td>
        <td>Enos</td>
        <td>55</td>
        <td>
          <div class="puik-switch__group">
            <button class="puik-switch" id="headlessui-switch-7" role="switch" type="button" tabindex="0" aria-checked="false" data-headlessui-state="">
              <span class="puik-switch__toggle"></span>
            </button>
          </div>
        </td>
        <td>toy.enos@email.com</td>
        <td>
          <button class="puik-button puik-button--text puik-button--md" aria-label="Delete item">
            <div class="puik-icon material-icons-round puik-button__right-icon" style="font-size: 1.25rem;">delete</div>
          </button>
        </td>
      </tr>
      <tr>
        <td class="puik-table__body__row__item--selection">
          <div class="puik-checkbox puik-table__body__row__item--selection__checkbox">
            <input id="puik-checkbox-282" class="puik-checkbox__input" type="checkbox">
            <label for="puik-checkbox-282" class="puik-checkbox__label">Select item</label>
          </div>
        </td>
        <td>Schumm</td>
        <td>Hollie</td>
        <td>21</td>
        <td>
          <div class="puik-switch__group">
            <button class="puik-switch" id="headlessui-switch-8" role="switch" type="button" tabindex="0" aria-checked="false" data-headlessui-state="">
              <span class="puik-switch__toggle"></span>
            </button>
          </div>
        </td>
        <td>schumm.hollie@email.com</td>
        <td>
          <button class="puik-button puik-button--text puik-button--md" aria-label="Delete item">
            <div class="puik-icon material-icons-round puik-button__right-icon" style="font-size: 1.25rem;">delete</div>
          </button>
        </td>
      </tr>
      <tr>
        <td class="puik-table__body__row__item--selection">
          <div class="puik-checkbox puik-table__body__row__item--selection__checkbox">
            <input id="puik-checkbox-7691" class="puik-checkbox__input" type="checkbox">
            <label for="puik-checkbox-7691" class="puik-checkbox__label">Select item</label>
          </div>
        </td>
        <td>DuBuque</td>
        <td>Earnestine</td>
        <td>86</td>
        <td>
          <div class="puik-switch__group">
            <button class="puik-switch" id="headlessui-switch-9" role="switch" type="button" tabindex="0" aria-checked="false" data-headlessui-state="">
              <span class="puik-switch__toggle"></span>
            </button>
          </div>
        </td>
        <td>dubuque.earnestine@email.com</td>
        <td>
          <button class="puik-button puik-button--text puik-button--md" aria-label="Delete item">
            <!--v-if-->
            <div class="puik-icon material-icons-round puik-button__right-icon" style="font-size: 1.25rem;">delete</div>
          </button>
        </td>
      </tr>
      <tr>
        <td class="puik-table__body__row__item--selection">
          <div class="puik-checkbox puik-table__body__row__item--selection__checkbox">
            <input id="puik-checkbox-2613" class="puik-checkbox__input" type="checkbox">
            <label for="puik-checkbox-2613" class="puik-checkbox__label">Select item</label>
          </div>
        </td>
        <td>Mann</td>
        <td>Hadley</td>
        <td>41</td>
        <td>
          <div class="puik-switch__group">
            <button class="puik-switch" id="headlessui-switch-10" role="switch" type="button" tabindex="0" aria-checked="false" data-headlessui-state="">
              <span class="puik-switch__toggle"></span>
            </button>
          </div>
        </td>
        <td>mann.hadley@email.com</td>
        <td>
          <button class="puik-button puik-button--text puik-button--md" aria-label="Delete item">
            <div class="puik-icon material-icons-round puik-button__right-icon" style="font-size: 1.25rem;">delete</div>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
      `,
      language: 'html',
    },
  },
}
