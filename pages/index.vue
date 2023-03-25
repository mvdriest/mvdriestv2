<template>
  <div class="page">
    <TheHeader />
    <ProjectList />
    <div class="infosection">
      <h1>Ik ben er om uw bedrijf op de juiste plek te plaatsen in de <span>digitale wereld</span> en op een professionele manier. Een goede huisstijl is essentieel om de juiste uitstraling te geven.</h1>
      <div><img src="~/assets/image/MacBookPro.jpg" alt="Macbook"></div>
    </div>
    <div class="textslider">
      <div class="textwrapper">
        <p>Webdesign</p>
        <div class="dot" />
        <p>Branding</p>
        <div class="dot" />
        <p>Video editing</p>
        <div class="dot" />
        <p>Webdevelopment</p>
        <div class="dot" />
        <p>Design</p>
        <div class="dot" />
      </div>
      <div class="textwrapper">
        <p>Webdesign</p>
        <div class="dot" />
        <p>Branding</p>
        <div class="dot" />π
        <p>Video editing</p>
        <div class="dot" />
        <p>Webdevelopment</p>
        <div class="dot" />
        <p>Design</p>
        <div class="dot" />
      </div>
    </div>
    <HomeSectionsServicesSection />
  </div>
</template>

<style lang="scss" scoped>
.page{
  background-color: #111216;
}

.infosection{
  padding: 150px 0px;
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  div{
     position: relative;
    img{
      object-fit: cover;
      width: 600px;
      height: 600px;
    }
  }
  h1{
    max-width: 650px;
    color: #fff;
    font-size: 40px;
    font-weight: 600;
    line-height: 62px;
    span{
      color: #F5FF00;
    }
  }
}
@media only screen and (max-width: 1400px){
  .infosection{
    gap: 50px;
    margin: 0px 30px;
  }
}
@media only screen and (max-width: 1100px){
  .infosection{
    flex-direction: column;
  }
}
.dot{
  width: 10px;
  height: 10px;
  margin-right: 25px;
  margin-left: 25px;
  border-radius: 20px;
  background-color: #000;
}
.textslider{
  background-color: #F5FF00;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
  flex-wrap: nowrap;
  transform: rotate(-3deg);
  .textwrapper{
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    p{
      direction: ltr;
      font-family: Sora, sans-serif;
      font-size: 40px;
      font-weight: 400;
      white-space: normal;
    }
  }
}

</style>
