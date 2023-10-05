<script lang="ts" setup>
type ContactStatus = {
  type: "none" | "pending" | "success" | "fail";
  message: String;
};
const contactStatus = ref<ContactStatus>({
  type: "none",
  message: "",
});

const sendForm = async (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);

  try {
    await $fetch("https://formspree.io/f/myyqynak", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    contactStatus.value = {
      type: "success",
      message: "Het versturen is gelukt!",
    };
  } catch (err: any) {
    console.error(
      "Er is iets fout gegaan bij het versturen van het formulier",
      err
    );
    if (err?.data?.errors) {
      contactStatus.value = {
        type: "fail",
        message: err?.data?.errors.map((e: any) => e?.message).join(", "),
      };
      return;
    }
    contactStatus.value = {
      type: "fail",
      message: "Er is iets fout gegaan. Probeer het later opnieuw!",
    };
  } finally {
    (e.target as HTMLFormElement)?.reset();
  }
};
</script>

<template>
  <section class="py-36 bg-dark-600">
    <LayoutTheContainer>
      <div class="flex justify-between gap-20">
        <div>
          <h1
            class="text-white text-4xl leading-snug md:text-6xl font-semibold md:max-w-2xl mb-8 md:leading-tight"
          >
            Laten we contacteren en uw idee tot leven brengen!
          </h1>
          <p class="text-white max-w-sm mb-8">
            Ik ben een creatief persoon die zich bezig houdt met onder andere
            grafisch ontwerpen.
          </p>
          <SocialsList color="yellow" direction="row" />
        </div>
        <div class="bg-white p-[40px] rounded-lg">
          <h1
            class="text-black max-w-md my-0 text-[2.5rem] leading-[50px] font-semibold mb-8"
          >
            Laten we contact maken
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
              <label class="text-black font-semibold">
                Uw volledige naam:
              </label>
              <input
                type="name"
                name="name"
                class="border placeholder:text-slate-500 bg-gray-100 rounded-md p-2"
                placeholder="John Doe"
              />
            </div>
            <div class="flex flex-col space-y-1">
              <label class="text-black font-semibold"> Uw email: </label>
              <input
                type="email"
                name="email"
                class="border placeholder:text-slate-500 bg-gray-100 rounded-md p-2"
                placeholder="email@email.com"
              />
            </div>
            <div class="flex flex-col space-y-1">
              <label class="text-black font-semibold"> Uw bericht: </label>
              <textarea
                rows="5"
                name="message"
                class="border placeholder:text-slate-500 bg-gray-100 rounded-md p-2"
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
    </LayoutTheContainer>
  </section>
</template>
