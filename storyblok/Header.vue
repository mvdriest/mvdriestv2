<script lang="ts" setup>
defineProps({
    blok: Object,
})
</script>

<template>
    <section class="header-section">
      <LayoutContainer>
        <div class="page-layout">
          <div class="header">
            <p>Welkom</p>
            <h1>Breng uw bedrijf naar 
            een <span>hoger niveau</span>
            </h1>
            <p>Hallo! Mijn naam is Martijn van Driest. Aangenaam kennis te maken. Ik ben een Grafisch Ontwerper uit Nederland.</p>
          </div>
        </div>
      </LayoutContainer>
    </section>
</template>

<style lang="scss" scoped>
.header-section{
  background-image: url("~/assets/image/logo-background.svg");
  background-position: 100% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

.page-layout{
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
}

.header{
  p:first-of-type{
    color: #F5FF00;
  }
  h1{
    font-size: 60px;
    color: white;
    font-weight: 600;
    max-width: 700px;
    margin: 30px 0px;
    span{
      color: #F5FF00;
    }
  }
  p:last-of-type{
    color: white;
    width: 400px;
    line-height: 1.7;
  }
}
</style>