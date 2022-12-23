<template>
  <div class="page">
    <h1>Klaar voor een <span>frisse wind</span> in uw bedrijf?</h1>
    <HomeButton class="btn" to="/">Neem contact op</HomeButton>
  </div> 
</template>
<style lang="scss" scoped>
  .page{
    background-image: url('https://a.storyblok.com/f/184315/x/6bf80ea2f9/waves.svg');
    padding: 150px 0px;
    background-position: 50% 0%;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    h1{
      max-width: 400px;
      margin-top: 0px;
      margin-bottom: 0px;
      font-family: Sora, sans-serif;
      color: #fff;
      font-weight: 600;
      text-align: center;
      font-size: 44px;
      line-height: 62px;
      span{
        color: #F5FF00;
      }
    }
  }
</style>