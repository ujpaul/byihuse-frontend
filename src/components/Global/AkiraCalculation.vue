<template>
  <div class="cover">
  <div class="flex">
    <h6>{{$t('message.feePaid')}}</h6>
    <span>{{fees.toString()}} RWF</span>
  </div>
  <div class="flex">
    <h6>Vat</h6>
    <span>{{VAT}} RWF </span>
  </div>
  <div class="flex">
    <h6>Akira</h6>
    <span>{{akira}} RWF</span>
  </div>
  </div>
</template>

<script>
export default {
 props: {
    fees: {type:String},
    VAT: String,
    akira:String
  }
}
</script>

<style>
.cover{
    width: 440px;
    height: 100px;
    border-radius: 3px;
    border: 2px #ff7d00 solid;
    padding: 10px;
    margin-right: 10px;
}
.flex{
    display: flex;
    justify-content: space-between;
    
}
</style>