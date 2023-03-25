<template>
  <div class="page">
    <div class="header-section">
      <LayoutTheContainer>
        <div class="page-layout">
          <div class="header">
            <h1>
              Ik ben er om uw bedrijf op de <span>juiste plek</span> te plaatsen in de digitale wereld
            </h1>
            <p>Ik ben een creatief persoon die zich bezig houdt met onder andere grafisch ontwerpen.</p>
          </div>
        </div>
      </LayoutTheContainer>
    </div>
    <div class="over-mij">
      <div class="image-section">
        <LayoutTheContainer>
          <div class="img" />
        </LayoutTheContainer>
        <div class="yellow-block" />
      </div>
      <div class="overmij-sectie">
        <LayoutTheContainer>
          <div class="overmij-sectie_wrap">
            <div>
              <h1>Laat me mijzelf introduceren</h1>
              <p>
                Hallo! Mijn naam is Martijn van Driest. Ik ben een Grafisch Ontwerper uit Nederland. Mijn doel is om
                bedrijven op de juiste plek te plaatsen in de digitale wereld. Dat kan doormiddel van een website of een
                volledige huisstijl. Ik kan een bedrijf kan professionaliseren en er een nieuwe frisse wind in brengen.
              </p>
            </div>ß
            <div>
              <a href=""><img
                src="https://a.storyblok.com/f/184315/x/a18966d378/behance-logo-black.svg"
                alt="Behance Logo"
              ></a>
              <a href=""><img
                src="https://a.storyblok.com/f/184315/x/05f5a8d960/linkedin-black.svg"
                alt="Linkedin logo"
              ></a>
              <a href=""><img
                src="https://a.storyblok.com/f/184315/x/9ef610a519/instagram1-black.svg"
                alt="Instagram logo"
              ></a>
            </div>
          </div>
        </LayoutTheContainer>
      </div>
      <HomeSectionsServicesSection class="servicesection" />
      <HomeSectionsContactSection />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page {
  background-color: #111216;
}

.servicesection {
  padding-bottom: 0px;
}

.image-section {
  position: relative;
  background-color: #111216;

  .img {
    position: relative;
    width: 100%;
    height: 400px;
    margin-right: auto;
    margin-left: auto;
    background-image: url('https://a.storyblok.com/f/184315/1514x1027/dd3388de7a/flyer-mockup-1.jpg');
    background-position: 50% 50%;
    background-size: cover;
    z-index: 1;
  }

  .yellow-block {
    position: absolute;
    left: 0%;
    top: auto;
    right: 0%;
    bottom: 0%;
    width: 100%;
    height: 50%;
    background-color: #f5ff00;
  }
}

.overmij-sectie {
  background-color: #f5ff00;
  padding: 110px 0px;

  &_wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    div:first-of-type {
      h1 {
        max-width: 400px;
        margin-top: 0px;
        margin-bottom: 0px;
        font-family: Sora, sans-serif;
        font-size: 40px;
        line-height: 50px;
        font-weight: 600;
      }

      p {
        max-width: 550px;
        margin-top: 30px;
        color: #1a1b1f;
        font-size: 16px;
        line-height: 28px;
        font-weight: 400;
      }
    }

    div:last-of-type {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 25px;

      img {
        transform: scale(1.2);
      }
    }
  }
}

.page-layout {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
}

.header-section {
  background-image: url("~/assets/image/logo-background.svg");
  background-position: 100% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

.header {
  p:first-of-type {
    color: #F5FF00;
  }

  h1 {
    font-size: 60px;
    color: white;
    font-weight: 600;
    max-width: 700px;
    margin: 30px 0px;
    line-height: 74px;

    span {
      color: #F5FF00;
    }
  }

  p:last-of-type {
    color: white;
    width: 400px;
    line-height: 1.7;
  }
}
</style>
