<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @changeFlights="changeFlights"/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                <!-- 航班信息 -->
                <FlightsItem 
                v-for="(item, index) in dataList"
                :key="index"
                :data="item"/>

                <!-- size-change：切换条数时候触发 -->
                <!-- current-change: 页数切换时候触发 -->
                <!-- current-page: 当前页数 -->
                <!-- page-size: 当前页面的条数 -->
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>

            </div>

            <!-- 侧边栏 -->
            <FlightsAside/>

        </el-row>
    </section>
</template>

<script>

import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"

export default {
    data(){
        return {
            flightsData: {
                flights: [],
                info: {},
                options: {} 
            }, // 总数据

            // 用于缓存大数据，一旦赋值之后不能被修改
            cacheFlightsData: {
                flights: [],
                info: {},
                options: {} 
            }, // 总数据

            pageIndex: 1,
            pageSize: 5,
            total: 0,
        }
    },

    // watch: {
    //     // 监听路由的变化
    //     $route(){
    //        // 请求机票列表
    //         this.getData();
    //     }
    // },

    // 当前url参数发生变化时候会触发
    beforeRouteUpdate (to, from, next) {
        next();
        this.getData();
    },

    // computed和watch的作用？有什么区别？
    // 如果要监听多个属性使用computed
    // 监听单个属性两个都可以使用


    // 监听和计算, 监听函数内部引用实例属性的变化，
    // 只要有一个属性发生了变化，函数会重新计算并且返回新的值
    computed: {
        dataList(){
            return this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );
        }
    },

    methods: {
        // 切换条数时候触发
        handleSizeChange(value){
            this.pageSize = value;
            // 重新回到第一页
            this.pageIndex = 1;
        },

        // 页数切换时候触发
        handleCurrentChange(value){
            this.pageIndex = value;
        },

        // 传递给子组件用于修改数据列表的事件
        changeFlights( arr ){
            this.flightsData.flights = arr;
            // 重新返回第一页
            this.pageIndex = 1;
            // 总条数
            this.total = this.flightsData.flights.length;
        },

        // 获取机票的列表
        getData(){
            this.pageIndex = 1;

            // 请求机票列表
            this.$axios({
                url: "/airs",
                params: this.$route.query
            }).then(res => {
                // 总数据，（flights, info, options, total）
                this.flightsData = res.data;

                // 下面的值赋值之后不能被修改，展开得到新的对象
                this.cacheFlightsData = { ...res.data};

                // 总条数
                this.total = this.flightsData.flights.length;
            })
        }
    },

    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },

    mounted(){
        // 获取机票列表数据
        this.getData();
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>