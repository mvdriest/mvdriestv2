<template>
  <div class="wrap">
    <img class="laptopfoto" src="https://a.storyblok.com/f/184315/1400x933/836f9f91e2/auto-atlas-laptop2.jpg" alt="LaptopFoto">
    <div class="text-wrap">
      <p class="diensten">Diensten</p>
      <h1 class="text-header">Deze diensten kunnen wij jou bieden</h1>
      <div class="dienstensection">
        <img src="~/assets/image/laptopicon.svg" alt="LaptopIcon">
        <div>
          <h1>Web design</h1>
          <p>Wanneer de consument uw website bezoekt geeft dat een eerste indruk van uw bedrijf.</p>
        </div>
      </div>
      <div class="dienstensection">
        <img src="~/assets/image/codeicon.svg" alt="DevelopmentIcon">
        <div>
          <h1>Web Development</h1>
          <p>Goede branding zorgt ervoor dat uw merk de juiste associaties oproept bij uw klanten.</p>
        </div>
      </div>
      <div class="dienstensection">
        <img src="~/assets/image/designicon.svg" alt="DesignIcon">
        <div>
          <h1>Branding</h1>
          <p>Goede branding zorgt ervoor dat uw merk de juiste associaties oproept bij uw klanten.</p>
        </div>
      </div>
    </div>    
  </div>
</template>
<style lang="scss" scoped>
.wrap{
  padding: 150px 0px;
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .laptopfoto{
    width: 500px;
    height: 700px;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .text-wrap{
    .diensten{
      color: #f5ff00;
      margin-bottom: 20px;
    }
    .text-header{
      max-width: 500px;
      color: #fff;
      font-size: 40px;
      line-height: 50px;
      font-weight: 600;
    }
    .dienstensection{
      display: flex;
      align-items: flex-start;
      margin-top: 30px;
      img{
        width: 40px;
      }
      div{
        margin-left: 25px;
        h1{
          color: #fff;
          font-size: 20px;
          line-height: 20px;
          font-weight: 700;
          margin-bottom: 15px;
        }
        p{
          max-width: 300px;
          color: #bebebe;
          font-size: 16px;
          line-height: 28px;
          font-weight: 400;
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px){
  .wrap{
    gap: 50px;
  }
}
@media only screen and (max-width: 1000px){
  .wrap{
    flex-direction: column;
    .laptopfoto{
      height: 400px;
    }
  }
}
</style>