<template>
  <div :class="{'has-logo': showLogo}">
    <sidebar-logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
      <a-menu
       :defaultSelectedKeys="activeMenu"
      :openKeys.sync="openKeys"
      mode="inline"
      :inlineCollapsed="isCollapse"
      >
      <!-- theme="dark" -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { PermissionModule } from '@/store/modules/permission'
import { SettingsModule } from '@/store/modules/settings'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/_variables.scss'
import { getArrByActive } from '@/utils/index.ts'
@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo
  }
})
export default class extends Vue {
  openKeys: string[] = []
  current: string[] = []
  get sidebar() {
    return AppModule.sidebar
  }

  get routes() {
    return PermissionModule.routes
  }

  get showLogo() {
    return SettingsModule.showSidebarLogo
  }

  get menuActiveTextColor() {
    if (SettingsModule.sidebarTextTheme) {
      return SettingsModule.theme
    } else {
      return variables.menuActiveText
    }
  }

  get variables() {
    return variables
  }

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      //  this.current.push(meta.activeMenu)
      return [meta.activeMenu]
    }
    return [path]
  }
  // @Watch('$route', { immediate: true })
  // onRouteChanged (val: any) {
  //   if (this.$route.path) {
  //     let arr = getArrByActive(this.$route, this.$route.path.split('/').pop() || '', 'key')
  //     if (arr && arr.length) {
  //       this.current = []
  //       this.openKeys = []
  //       arr.forEach((item, index) => {
  //         if (index === arr.length - 1) {
  //           this.current.push(item)
  //         } else {
  //           this.openKeys.push(item)
  //         }
  //       })
  //     }
  //   }
  // }
  get isCollapse() {
    return !this.sidebar.opened
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
