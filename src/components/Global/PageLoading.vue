<template>
   <div class="mgn">
       <div class="loading">
            <div class="text">AKIRA</div>
        </div>
   </div>
</template>

<script>
export default {
   props:['heading','subHeading','subTitle']
}
</script>
<style scoped>
        body{
            background: none;
            padding-top: 50%;
        }
        .mgn
        {
            margin-top: 20%;
        }
        .loading{
            margin: 50px auto;
            border: solid 5px #eee;
            border-top: solid 8px #ff7d00;
            border-right: solid 8px #ff7d00;
            width: 70px;
            height: 70px;
            padding: 10px;
            border-radius: 50%;
            font: none;
            align-items: center;
            justify-content: center;
            animation: loading 1s infinite linear;
            
        }
        .text
        {
            font-size: 12px;
            margin-top: 35%;
        }
        @keyframes loading {
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(360deg);
            }
        }
    </style>