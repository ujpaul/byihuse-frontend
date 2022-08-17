<template>
  <v-app>
    <div class="container">
      <img
        class="img"
        src="/static/images/notfound.png"
        width="400"
        alt="Not found image"
      />
      <div class="text">
        Mutwihanganire mugihe haribyo turi gushyira kumurongo<br />
        Turabizeza ko urubuga rwa Byihuse rugaruka kumurongo mugihe cyavuba
        cyane<br />
        Tubashimiye uburyo mubyakiriye. Murakoze!!
      </div>
    </div>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
img {
  max-width: 600px;
  margin-top: 100px;
}
.text {
  margin-top: 20px;
  font-family: "Beau Rivage", cursive;
  font-size: 25px;
  line-height: 1.5;
  font-weight: 600;
  /* color: #00377C; */
}
</style>
