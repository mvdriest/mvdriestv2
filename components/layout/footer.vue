<template>
  <div class="page">
    <LayoutContainer>
      <img src="https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel.png" loading="lazy" width="98" srcset="https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel-p-500.png 500w, https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel-p-800.png 800w, https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel-p-1080.png 1080w, https://uploads-ssl.webflow.com/61df3d19f28c1371429c6b39/6205155254ddece058ef5179_Logo-mvdriest-geel.png 2000w" sizes="(max-width: 479px) 100vw, 98px" alt="">
      <div class="footer-wrap">
        <div class="left-wrap">
          <div class="text-wrap">
            <h1>Laten we contact maken en elkaar leren kennen</h1>
            <a href="">+31 6 45506565</a>
            <a href="">Martijn.vandriest@gmail.com</a>
          </div>
          <div class="pages">
            <h1>Pagina's</h1>
            <div>
              <NuxtLink to="">Voorpagina</NuxtLink>
              <NuxtLink to="">Over mij</NuxtLink>
              <NuxtLink to="">Portfolio</NuxtLink>
            </div>
          </div>
        </div>
        <div class="social-media">
          <a href=""> <img src="https://a.storyblok.com/f/184315/x/8755b5b016/behance-logo.svg" alt="Behance Logo"></a>
          <a href=""> <img src="https://a.storyblok.com/f/184315/x/64ddef6393/linkedin.svg" alt="Linkedin logo"></a>
          <a href=""> <img src="https://a.storyblok.com/f/184315/x/797bf57e65/instagram1.svg" alt="Instagram logo"></a>
        </div>
      </div>
      <div class="copyright">
        <p>© 2021 Martijn van Driest</p>
        <a href="">Privacy verklaring</a>
      </div>
    </LayoutContainer>
  </div>
</template>

<style lang="scss" scoped>
.page{
  border-top: 2px solid #464646;
  background-color: #111216;
  padding: 100px 0px;
}
.copyright{
  display: flex;
  color: white;
  border-top: 2px solid #464646;
  padding-top: 20px;
  justify-content: space-between;
}
.footer-wrap{
  margin: 50px 0px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.social-media{
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
}
.text-wrap{
  display: flex;
  flex-direction: column;
  h1{
    color: white;
    max-width: 400px;
    font-size: 30px;
    line-height: 30px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  a:nth-last-of-type(1){
    margin-top: 10px;
  }
}
a{
  text-decoration: none;
  color: white;
  cursor: pointer;
}
a:hover{
  color: #f5ff00;
}
.left-wrap{
  display: flex;
  align-items: flex-start;
  gap: 90px;
}
.pages{
  h1{
    color: white;
    margin-bottom: 22px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 700;
  }
  div{
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>