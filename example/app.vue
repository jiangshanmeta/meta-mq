<template>
    <section class="demo-container">
        <h1 class="demo-title">
            currentBreakpoint {{$mq}}
        </h1>
        
        <main>
            <mq-layout visible="sm" minus tag="section" slim>
                <p class="demo-paragraph">this paragraph only shows on sm and xs</p>
            </mq-layout>
            <mq-layout :visible="['sm','lg']" tag="article">
                <p class="demo-paragraph">this paragraph shows on sm and lg</p>
                <p class="demo-paragraph">this paragraph shows on sm and lg</p>
            </mq-layout>
        </main>
    </section>
</template>

<script>
export default{

}
</script>

<style>
.demo-container{
    padding:32px;
    text-align:center;
}
.demo-title{
    padding-top:14px;
    padding-bottom:14px;
    color:#999;
}
.demo-paragraph{
    color:#333;
    font-weight:bold;
    font-size:14px;
}
</style>