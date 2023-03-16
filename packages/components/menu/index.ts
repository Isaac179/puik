import { withInstall } from '@puik/utils'

import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import MenuItemGroup from './src/menu-item-group.vue'
import MenuItemSeparator from './src/menu-item-separator.vue'

export const PuikMenu = withInstall(Menu)
export const PuikMenuItem = withInstall(MenuItem)
export const PuikMenuItemGroup = withInstall(MenuItemGroup)
export const PuikMenuItemSeparator = withInstall(MenuItemSeparator)
export default PuikMenu

export * from './src/menu'
export * from './src/menu-item'
export * from './src/menu-item-group'
export * from './src/menu-item-separator'
