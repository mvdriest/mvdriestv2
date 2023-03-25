<template>
  <div class="slidersection">
    <div class="list">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list{
  display: flex;
  overflow: hidden;
  grid-column-gap: 15px;
  div{
    width: 35%;
    height: 80vh;
    position: relative;
    float: left;
    background-color: #303030;
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    flex: 0 0 auto;
  }
}
</style>
