<template>
  <div class="nav">
    <LayoutContainer>
      <nav class="test">
          <NuxtLink to="/">
            <img src="~/assets/image/Logo-mvdriest-geel.png" alt="logo">
          </NuxtLink>
          <div>
            <NuxtLink to="/over-mij">Over mij</NuxtLink>
            <NuxtLink to="/">Porfolio</NuxtLink>
          </div>
          <div>
            <NuxtLink to="/">Contact</NuxtLink>
          </div>
      </nav>
    </LayoutContainer>
  </div>
</template>

<style lang="scss" scoped>
.nav{
  position: absolute;
  width: 100%;
  top: 0%;
}
img{
  width: 5em;
}
.test{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  div:first-of-type{
    display: flex;
    gap: 20px;
    a{
      opacity: 1;
      color: #fff;
      font-size: 16px;
      line-height: 20px;
      font-weight: 400;
      letter-spacing: 1px;
      text-decoration: none;
      text-transform: none;
    }
  }
  div:last-of-type{
    a{
      text-decoration: none;
      text-transform: none;
      color: #000;
      background-color: #F5FF00;
      padding: 15px 40px;
      border-radius: 8px;
    }
  }
}
</style>