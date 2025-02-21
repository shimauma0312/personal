<template>
    <el-carousel height="250px">
        <el-carousel-item class="item item-color" v-for="i in 3" :key="i">
            <h3>{{i}}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<style>
.item {
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-color:nth-child(2n){
    background-color: #99a9bf;
} 
.item-color:nth-child(2n + 1){
    background-color: #d3dce6;
}
</style>
