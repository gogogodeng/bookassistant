<template>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/">计算价格</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/price">凑单组合</router-link>
  </p>
  <router-view></router-view>
</template>
