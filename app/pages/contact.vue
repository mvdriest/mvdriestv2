<script lang="ts" setup>
type ContactStatus = {
  type: 'none' | 'pending' | 'success' | 'fail';
  message: String;
};
const contactStatus = ref<ContactStatus>({
  type: 'none',
  message: ''
})

const sendForm = async (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement)

  try {
    await $fetch('https://formspree.io/f/myyqynak', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })

    contactStatus.value = {
      type: 'success',
      message: 'Het versturen is gelukt!'
    }
  } catch (err: any) {
    console.error(
      'Er is iets fout gegaan bij het versturen van het formulier',
      err
    )
    if (err?.data?.errors) {
      contactStatus.value = {
        type: 'fail',
        message: err?.data?.errors.map((e: any) => e?.message).join(', ')
      }
      return
    }
    contactStatus.value = {
      type: 'fail',
      message: 'Er is iets fout gegaan. Probeer het later opnieuw!'
    }
  } finally {
    (e.target as HTMLFormElement)?.reset()
  }
}
</script>

<template>
  <section class="pb-36 bg-gray-200">
    <div class="w-full h-[50lvh] relative">
      <div 
        class="absolute inset-0 bg-cover flex items-center justify-center"
        :style="{
          backgroundImage: 'url(/images/other/camerafotoik.jpg)',
          backgroundPosition: '100% 30%',
          backgroundSize: '130%',
          transform: 'scaleX(-1)',
          filter: 'grayscale(100%) brightness(1) contrast(1.1)'
        }"
      >
    
      </div>
      <LayoutTheContainer class="flex items-end justify-start h-full">
          <h1 ref="title" class="hero-title uppercase text-4xl max-w-4xl leading-snug md:text-7xl 2xl:text-8xl font-bold text-left text-primary-600 md:leading-[4.5rem] 2xl:leading-[5.8rem] z-10 -tracking-[4px] absolute bottom-8 md:bottom-10">
            Welk <br/>
            merk mag ik <br/>
            pimpen?  
          </h1>
      </LayoutTheContainer>
    </div>
    <LayoutTheContainer>
      <div class="grid md:grid-cols-4 gap-20 mt-20">
        <div class="flex items-start justify-top flex-col gap-8">
          <div>
            <p class="text-xl text-dark-800 font-semibold font-family-helvetica -tracking-[1px] uppercase opacity-70 pb-2">Email</p>
            <CopyEmailButton email="info@mvdriest.nl" />
          </div>
          <div class="flex items-start justify-top flex-col">
            <p class="text-xl text-dark-800 font-semibold font-family-helvetica -tracking-[1px] uppercase opacity-70 pb-2">Email</p>
            <p class="text-xl text-dark-800 font-semibold font-family-helvetica -tracking-[1px] uppercase pb-2">Kvk: 12345678</p>
            <p class="text-xl text-dark-800 font-semibold font-family-helvetica -tracking-[1px] uppercase">BTW: NL866034080B01</p>
          </div>
        </div>
        <div class="col-span-3">
          <div class="bg-white p-[40px] rounded-lg">
            <h1
              class="text-black max-w-3xl my-0 text-[2.0rem] leading-[50px] font-semibold mb-8"
            >
              Laat een bericht achter
            </h1>
            <p
              v-if="
                contactStatus.type === 'success' || contactStatus.type === 'fail'
              "
              :class="
                contactStatus.type === 'success'
                  ? 'text-green-500'
                  : 'text-red-500'
              "
            >
              {{ contactStatus.message }}
            </p>
            <form class="flex flex-col space-y-5" @submit.prevent="sendForm">
              <div class="flex flex-col space-y-1">
                <label class="text-[18px] text-dark-800 font-semibold font-family-helvetica -tracking-[1px] uppercase">
                  Uw volledige naam:
                </label>
                <input
                  type="name"
                  name="name"
                  class="border placeholder:text-slate-300 bg-gray-100 rounded-md p-2"
                  placeholder="John Doe"
                >
              </div>
              <div class="flex flex-col space-y-1">
                <label class="text-[18px] text-dark-800 font-semibold font-family-helvetica -tracking-[1px] uppercase"> Uw email: </label>
                <input
                  type="email"
                  name="email"
                  class="border placeholder:text-slate-300 bg-gray-100 rounded-md p-2"
                  placeholder="email@email.com"
                >
              </div>
              <div class="flex flex-col space-y-1">
                <label class="text-[18px] text-dark-800 font-semibold font-family-helvetica -tracking-[1px] uppercase"> Uw bericht: </label>
                <textarea
                  rows="5"
                  name="message"
                  class="border placeholder:text-slate-300 bg-gray-100 rounded-md p-2"
                  placeholder="Vertel wat over het project"
                />
              </div>
              <button
                type="submit"
                class="bg-black text-primary-600 px-6 py-4 rounded-md"
              >
                Verstuur
              </button>
            </form>
          </div>
        </div>
      </div>
      
    </LayoutTheContainer>
  </section>
</template>
