<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <!-- <OrderForm @setInfoData="setInfoData"/> -->
            <OrderForm/>

            <!-- 侧边栏  -->
            <OrderAside :data="$store.state.air.infoData" />
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";

export default {
    data(){
        return {
            // infoData: {
            //     seat_infos: {}
            // }, // 订单机票的信息
        }
    },
    components: {
        OrderForm,
        OrderAside
    },

    methods: {
        // setInfoData( data ){
        //     this.infoData = data;
        // }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>