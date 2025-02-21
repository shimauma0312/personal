<template>
    <el-carousel height="250px">
        <el-carousel-item class="item" v-for="i in 3" :key="i">
            <h3>{{i}}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<style>
.item {
    flex;
    justify-content: center;
    align-items: center;
}
</style>
