<template>
  <view class="da-dropdown" :class="{'is-fixed': fixedTop, 'has-search': hasSearch}" :style="dropdownStyle">
    <!-- 搜索 -->
    <view class="da-dropdown-search" v-if="hasSearch" @touchmove.stop.prevent="handleMove">
      <input
        class="da-dropdown-search-input"
        :value="searchItem.value"
        @input="handleSearchChange"
        :placeholder="searchItem.placeholder || '请输入'"
        @confirm="handleSearch"
        confirm-type="search" />
      <button class="da-dropdown-search-btn" @click="handleSearch">搜索</button>
    </view>
    <!-- 菜单 -->
    <view class="da-dropdown-menu" @touchmove.stop.prevent="handleMove">
      <view
        class="da-dropdown-menu-item"
        :class="{'is-hidden':item.isHidden === 'true'}"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleMenuClick(index,item)">
        <text class="da-dropdown-menu-item--text" :class="item.isActived ? 'is-actived' : ''">{{ menuActiveText ? (item.activeTitle || item.title) : item.title }}</text>
        <view class="da-dropdown-menu-item--arrow" :class="item.isClick ? 'is-actived':''" v-if="item.type !== 'click' && item.type !== 'sort'"></view>
        <view class="da-dropdown-menu-item--sort" v-if="item.type === 'sort'" :class="'is--' + item.value"></view>
      </view>
    </view>
    <!-- 弹出 -->
    <view class="da-dropdown-content" :class="{'is-show': isShow,'is-visible': isVisible}">
      <view class="da-dropdown-content-popup" :class="isShow ? 'is-show' : ''">
        <view class="da-dropdown-popup-box" v-for="(item, index) in menuList" :key="index">
          <!-- 下拉列表 -->
          <DropdownCell
            v-if="item.type === 'cell' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handleCellSelect"></DropdownCell>
          <!-- 多条件筛选 -->
          <DropdownFilter
            v-if="item.type === 'filter' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handleFilterConfirm"></DropdownFilter>
          <!-- 级联选择 -->
          <DropdownPicker
            v-if="item.type === 'picker' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handlePickerConfirm" />
          <!-- 日期范围 -->
          <DropdownDaterange
            v-if="item.type === 'daterange' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handleDaterangeConfirm" />
          <!-- 弹窗插槽拓展X5 -->
          <template v-if="item.type === 'slot1' && index === currentIndex">
            <slot name="slot1" :item="item" :index="index"></slot>
          </template>
          <template v-if="item.type === 'slot2' && index === currentIndex">
            <slot name="slot2" :item="item" :index="index"></slot>
          </template>
          <template v-if="item.type === 'slot3' && index === currentIndex">
            <slot name="slot3" :item="item" :index="index"></slot>
          </template>
          <template v-if="item.type === 'slot4' && index === currentIndex">
            <slot name="slot4" :item="item" :index="index"></slot>
          </template>
          <template v-if="item.type === 'slot5' && index === currentIndex">
            <slot name="slot5" :item="item" :index="index"></slot>
          </template>
        </view>
      </view>
      <view
        class="da-dropdown-content-mask"
        v-if="fixedTop"
        @tap="handlePopupMask"
        @touchmove.stop.prevent="handleMove" />
    </view>
    <view class="da-dropdown--blank" v-if="fixedTop"></view>
  </view>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from 'vue'

import { deepClone } from './utils'
import DropdownPicker from './components/picker.vue'
import DropdownCell from './components/cell.vue'
import DropdownFilter from './components/filter.vue'
import DropdownDaterange from './components/daterange.vue'

export default defineComponent({
  components: { DropdownPicker, DropdownCell, DropdownFilter, DropdownDaterange },
  props: {
    /**
     * 导航菜单数据
     */
    dropdownMenu: {
      type: Array,
      default: () => [],
    },
    /**
     * 菜单激活时，是否改变为激活项文字
     */
    menuActiveText: {
      type: Boolean,
      default: true,
    },
    /**
     * 激活颜色
     */
    themeColor: {
      type: String,
      default: '#007aff',
    },
    /**
     * 常规颜色
     */
    textColor: {
      type: String,
      default: '#333333',
    },
    /**
     * 背景颜色，当固定在顶部时，此为必填
     */
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    /**
     * 是否固定在顶部
     */
    fixedTop: {
      type: Boolean,
      default: false,
    },
    /**
     * 固定在头部时的位置，单位px
     * 如果页面定义了 "navigationStyle": "custom" ，因此固定头部时需要额外获取状态栏高度，以免被异形屏头部覆盖
     */
    fixedTopValue: {
      type: Number,
      default: 0,
    },
    /**
     * 弹窗过渡时间
     */
    duration: {
      type: [Number, String],
      default: 300,
    },
  },
  emits: ['open', 'close', 'update:dropdownMenu', 'confirm'],
  setup(props, { emit }) {
    const currentIndex = ref(-1)
    const isVisible = ref(false)
    const isShow = ref(false)
    const menuList = ref([])
    const hasSearch = ref(false)
    const searchItem = ref(null)

    // 主题样式
    const dropdownStyle = computed(() => {
      return `
        --dropdown-theme-color: ${props.themeColor};
        --dropdown-text-color: ${props.textColor};
        --dropdown-background-color: ${props.bgColor};
        --dropdown-popup-duration: ${props.duration / 1000}}s;
        --dropdown-fixed-top: ${props.fixedTopValue || 0}}px;
      `
    })
    /**
     * 初始化数据
     */
    async function initData(dropdownMenuData) {
      const newMenu = deepClone(dropdownMenuData || [])
      const hasShowAllType = ['cell', 'picker']
      const allItem = { label: '不限', value: '-9999' }
      if (newMenu?.length) {
        for (let i = 0; i < newMenu.length; i++) {
          const item = newMenu[i]

          // 处理初始项
          if (hasShowAllType.includes(item.type)) {
            if (item.syncDataFn && typeof item.syncDataFn === 'function') {
              const syncOptions = await item.syncDataFn()
              item.options = syncOptions || []
            }
          }

          if (item.options?.length) {
            if (item.field) {
              item.options = alignData(item.options, item.field)
            }
            if (item.showAll) {
              if (item.options.findIndex((k) => k.value === allItem.value) === -1) {
                item.options.unshift(allItem)
              }
            }
          }

          // 处理已选项
          if (item.value || item.value === 0 || item.value === false) {
            if (item.type === 'cell') {
              for (let x = 0; x < item.options.length; x++) {
                const k = item.options[x]
                if (k.value === item.value) {
                  item.isActived = true
                  item.activeTitle = k.label
                  break
                }
              }
            }
            if (item.type === 'click') {
              item.isActived = item.value === true
            }
            if (item.type === 'sort') {
              item.isActived = item.value === 'asc' || item.value === 'desc'
            }
            if (item.type === 'filter') {
              item.isActived = JSON.stringify(item.value || {}) !== '{}'
            }
            if (item.type === 'picker') {
              item.isActived = item.value?.length
            }
            if (item.type === 'daterange') {
              item.isActived = item.value?.start && item.value?.end
            }
            if (item.type === 'slot') {
              item.isActived = !!item.value
            }
          } else {
            item.isActived = false
            if (item.type === 'cell') {
              item.activeTitle = null
            }
          }

          // 搜索项特殊处理
          if (item.type === 'search') {
            item.isHidden = 'true'
            searchItem.value = item
            hasSearch.value = true
          }
        }
      }
      menuList.value = newMenu
    }
    /**
     * 处理部分初始数据
     * @param data
     */
    function alignData(data, alignField) {
      for (let i = 0; i < data.length; i++) {
        const k = data[i]
        k.label = k[alignField?.label || 'label'] || null
        k.value = k[alignField?.value || 'value'] || null
        k.children = k[alignField?.children || 'children'] || null
        if (k.children?.length) {
          alignData(k.children, alignField)
        }
      }
      return data
    }
    /**
     * 初始化获取系统信息
     */
    function initDomInfo() {}
    /**
     * 打开弹窗
     * @param index 当前激活索引
     */
    function handlePopupShow(index) {
      isShow.value = true
      isVisible.value = true
      currentIndex.value = index
      emit('open', currentIndex.value)
    }
    /**
     * 关闭弹窗
     */
    function handlePopupHide() {
      isShow.value = false
      // 延迟移除下拉弹窗
      setTimeout(() => {
        isVisible.value = false
        clearIndex()
      }, props.duration)
      emit('close', currentIndex.value)
    }
    /**
     * 点击蒙层
     */
    function handlePopupMask() {
      if (menuList.value?.length) {
        menuList.value.forEach(k => {
          k.isClick = false
        })
      }
      handlePopupHide()
    }
    /**
     * 清理滚动
     */
    function handleMove() {
      return false
    }
    /**
     * 关闭弹窗
     */
    function clearIndex() {
      currentIndex.value = -1
    }
    /**
     * 点击菜单项
     */
    function handleMenuClick(index, item) {
      const dropdownMenu = menuList.value
      const menuItem = dropdownMenu[index]

      dropdownMenu.forEach(k => {
        k.isClick = false
      })

      if (menuItem.type === 'click') {
        return handleItemClick(menuItem, index)
      }

      if (menuItem.type === 'sort') {
        return handleItemSort(menuItem, index)
      }
      if (index === currentIndex.value) {
        item.isClick = false
        handlePopupHide()
        return
      }

      item.isClick = true

      handlePopupShow(index)
    }
    /**
     * 搜索输入
     */
    function handleSearchChange(e) {
      searchItem.value.value = e?.detail?.value
    }
    /**
     * 确定搜索
     */
    function handleSearch() {
      if (searchItem.value?.prop) {
        const res = { [searchItem.value.prop]: searchItem.value.value }
        emit('update:dropdownMenu', menuList.value)
        emit('confirm', res)
      } else {
        console.error(`菜单项${searchItem.value.title}未定义prop，返回内容失败`)
      }
    }
    /**
     * 菜单项-下拉列表回调
     * @param callbackData 操作返回的数据
     * @param cellItem 下拉列表项数据
     * @param index 菜单索引
     */
    function handleCellSelect(callbackData, cellItem, index) {
      const dropdownMenu = menuList.value
      const item = dropdownMenu[index]
      item.isClick = false

      if (cellItem.value === '-9999') {
        item.isActived = false
        item.activeTitle = undefined
        item.value = null
      } else {
        item.isActived = true
        item.activeTitle = cellItem.label
        item.value = cellItem.value
      }

      handlePopupHide()
      emit('update:dropdownMenu', dropdownMenu)
      emit('confirm', callbackData)
    }
    /**
     * 菜单项-点击
     * @param item 菜单项
     * @param index 菜单项索引
     */
    function handleItemClick(item, index) {
      handlePopupHide()

      if (currentIndex.value === -1) {
        currentIndex.value = index
        item.value = true
        item.isActived = true
      } else {
        item.value = false
        item.isActived = false
        clearIndex()
      }
      if (item?.prop) {
        const res = { [item.prop]: item.value }
        emit('update:dropdownMenu', menuList.value)
        emit('confirm', res)
      } else {
        console.error(`菜单项${item.title}未定义prop，返回内容失败`)
      }
    }
    /**
     * 菜单项-排序
     * @param item 菜单项
     * @param index 菜单项索引
     */
    function handleItemSort(item, index) {
      handlePopupHide()

      if (item.value === 'asc') {
        item.value = 'desc'
        currentIndex.value = index
        item.isActived = true
      } else if (item.value === 'desc') {
        item.value = undefined
        item.isActived = false
        clearIndex()
      } else {
        item.value = 'asc'
        currentIndex.value = index
        item.isActived = true
      }

      if (item?.prop) {
        const res = { [item.prop]: item.value }
        emit('update:dropdownMenu', menuList.value)
        emit('confirm', res)
      } else {
        console.error(`菜单项${item.title}未定义prop，返回内容失败`)
      }
    }
    /**
     * 菜单项-筛选回调
     * @param callbackData 操作返回的数据
     * @param filterData 筛选数据
     * @param index 菜单索引
     */
    function handleFilterConfirm(callbackData, filterData, index) {
      const dropdownMenu = menuList.value
      const item = dropdownMenu[index]
      item.isClick = false

      item.isActived = JSON.stringify(filterData || {}) !== '{}'
      item.activeTitle = undefined
      item.value = filterData

      handlePopupHide()
      emit('update:dropdownMenu', dropdownMenu)
      emit('confirm', callbackData)
    }
    /**
     * 菜单项-级联回调
     * @param callbackData 操作返回的数据
     * @param pickerItem 级联已选数据
     * @param index 菜单索引
     */
    function handlePickerConfirm(callbackData, pickerItem, index) {
      const dropdownMenu = menuList.value
      const item = dropdownMenu[index]
      item.isClick = false

      if (!pickerItem || pickerItem[0] === '-9999') {
        item.isActived = false
        item.activeTitle = undefined
        item.value = null
      } else {
        item.isActived = true
        item.value = pickerItem
      }

      handlePopupHide()
      emit('update:dropdownMenu', dropdownMenu)
      emit('confirm', callbackData)
    }
    /**
     * 菜单项-日期范围回调
     * @param callbackData 操作返回的数据
     * @param daterangeItem 日期范围数据
     * @param index 菜单索引
     */
    function handleDaterangeConfirm(callbackData, daterangeItem, index) {
      const dropdownMenu = menuList.value
      const item = dropdownMenu[index]
      item.isClick = false

      if (daterangeItem?.start && daterangeItem?.end) {
        item.isActived = true
        item.value = daterangeItem
      } else {
        item.isActived = false
        item.activeTitle = undefined
        item.value = null
      }

      handlePopupHide()
      emit('update:dropdownMenu', dropdownMenu)
      emit('confirm', callbackData)
    }

    watch(() => props.dropdownMenu,
      (v) => {
        initData(v)
      }, { immediate: true, deep: true })

    onMounted(() => {
      initDomInfo()
    })

    return {
      initData,
      menuList,
      dropdownStyle,
      currentIndex,
      isShow,
      isVisible,
      hasSearch,
      searchItem,
      handleSearchChange,
      handleSearch,
      handleMenuClick,
      handlePopupHide,
      handlePopupMask,
      handleMove,

      handleCellSelect,
      handleFilterConfirm,
      handlePickerConfirm,
      handleDaterangeConfirm,
    }
  },
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'da-dropdown-iconfont'; /* Project id  */
  src: url('data:application/octet-stream;base64,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') format('truetype');
}

.da-dropdown {
  --dropdown-menu-height: 80rpx;
  --dropdown-popup-duration: 0.3s;

  position: relative;
  z-index: 888;
  width: 100%;
  line-height: 1;

  &--blank {
    width: 100%;
    height: var(--dropdown-menu-height);
  }

  &-search {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--dropdown-menu-height);
    padding: 10rpx 20rpx 6rpx;
    background: var(--dropdown-background-color,#fff);

    &-input {
      flex-grow: 1;
      height: 60rpx;
      padding: 0 20rpx;
      overflow: hidden;
      font-size: 28rpx;
      color: var(--dropdown-text-color);
      background: #f6f6f6;
      border-radius: 8rpx 0 0 8rpx;
    }

    &-btn {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      height: 60rpx;
      padding: 0 20rpx;
      overflow: hidden;
      font-size: 28rpx;
      color: var(--dropdown-text-color);
      background: #f6f6f6;
      border: none;
      border-radius: 0 8rpx 8rpx 0;

      &::after {
        display: none;
      }
    }
  }

  &-menu {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: var(--dropdown-menu-height);
    background: var(--dropdown-background-color,#fff);
    box-shadow: 0 1rpx 0 0 #bbb;

    &-item {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      height: 100%;

      &:hover {
        background: #fafafa;
      }

      &.is-hidden {
        display: none;
      }

      &--text {
        font-size: 24rpx;
        color: var(--dropdown-text-color);

        &.is-actived {
          color: var(--dropdown-theme-color);
        }
      }

      &--arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24rpx;
        height: 24rpx;
        color: #bbb;

        &::after {
          margin-bottom: -2rpx;
          /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
          font-family: 'da-dropdown-iconfont' !important;
          font-size: 24rpx;
          font-style: normal;
          content: '\e604';
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        &.is-actived {
          ::after {
            content: '\e604';
          }

          color: var(--dropdown-theme-color);
          opacity: 1;
          transform: rotate(180deg);
        }
      }

      &--sort {
        position: relative;
        margin-left: 6rpx;
        transition: transform 0.3s;

        &::before,
        &::after {
          position: absolute;
          top: calc(50% - 16rpx);
          left: 0;
          content: '';
          border-color: transparent;
          border-style: solid;
          border-width: 8rpx;
          border-bottom-color: #bbb;
        }

        &::after {
          top: calc(50% + 6rpx);
          border-top-color: #bbb;
          border-bottom-color: transparent;
        }

        &.is--asc::before {
          border-bottom-color: var(--dropdown-theme-color);
        }

        &.is--desc::after {
          border-top-color: var(--dropdown-theme-color);
        }
      }
    }
  }

  &-content {
    position: absolute;
    top: var(--dropdown-menu-height);
    left: 0;
    z-index: -1;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    visibility: hidden;
    box-shadow: 0 -1rpx 0 0 #bbb;
    opacity: 0;
    transition: all var(--dropdown-popup-duration,0.3s) linear;

    &.is-show {
      z-index: 901;
      opacity: 1;
    }

    &.is-visible {
      visibility: visible;
      animation: CustomBS var(--dropdown-popup-duration) linear var(--dropdown-popup-duration) forwards;
    }

    &-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
    }

    &-popup {
      position: relative;
      z-index: 10;
      max-height: 100%;
      overflow: auto;
      transition: transform var(--dropdown-popup-duration) linear;
      transform: translateY(-100%);

      &.is-show {
        transform: translateY(0);
      }
    }
  }

  &-popup-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 28rpx;
    line-height: 1;
    background: var(--dropdown-background-color,#fff);
    transition: border-radius var(--dropdown-popup-duration) linear;
  }

  /* 固定至顶 */
  &.is-fixed {
    z-index: 980;

    .da-dropdown {
      &-search {
        position: fixed;
        top: calc(var(--window-top,0px) + var(--dropdown-fixed-top,0px));
        right: 0;
        left: 0;
        max-width: 1190px;
        margin: auto;
      }

      &-menu {
        position: fixed;
        top: calc(var(--window-top,0px) + var(--dropdown-fixed-top,0px));
        right: 0;
        left: 0;
        max-width: 1190px;
        margin: auto;
      }

      &-content {
        position: fixed;
        top: calc(var(--window-top,0px) + var(--dropdown-fixed-top,0px) + var(--dropdown-menu-height,0px));
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        box-shadow: none;
      }
    }

    &.has-search {
      .da-dropdown {
        &-menu {
          top: calc(var(--window-top,0px) + var(--dropdown-fixed-top,0px) + var(--dropdown-menu-height,0px));
        }

        &-content {
          top: calc(var(--window-top,0px) + var(--dropdown-fixed-top,0px) + var(--dropdown-menu-height,0px) + var(--dropdown-menu-height,0px));
        }

        &--blank {
          height: calc(var(--dropdown-fixed-top,0px) + var(--dropdown-menu-height,0px) + var(--dropdown-menu-height,0px));
        }
      }
    }
  }
}

@keyframes CustomBS {
  0% {
    box-shadow: 0 -1rpx 0 0 #bbb;
  }

  100% {
    box-shadow: 0 -1rpx 0 0 #bbb,0 20rpx 20rpx -10rpx rgba(0, 0, 0, 0.1);
  }
}
</style>
