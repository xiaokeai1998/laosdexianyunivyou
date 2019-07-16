<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
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
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"

export default {
    data(){
        return {
            flightsData: {
                flights: []
            }, // 总数据
            dataList: [], // 只负责页面渲染的数组

            pageIndex: 1,
            pageSize: 5,
            total: 0,
        }
    },

    // computed和watch的作用？有什么区别？
    // 如果要监听多个属性使用computed
    // 监听单个属性两个都可以使用


    // 监听和计算, 监听函数内部引用实例属性的变化，
    // 只要有一个属性发生了变化，函数会重新计算并且返回新的值
    // computed: {
    //     dataList(){
    //         return this.flightsData.flights.slice(
    //             (this.pageIndex - 1) * this.pageSize,
    //             this.pageIndex * this.pageSize
    //         );
    //     }
    // },

    // watch可以监听实例属性的变化
    // watch: {
    //     $route(){
    //     }
    // },

    methods: {
        // 切换条数时候触发
        handleSizeChange(value){
            this.pageSize = value;
            // 重新回到第一页
            this.pageIndex = 1;

            // 设置显示数据列表
            this.setDataList();
        },

        // 页数切换时候触发
        handleCurrentChange(value){
            this.pageIndex = value;
            
            // 设置显示数据列表
            this.setDataList();
        },

        // 设置显示数据列表
        setDataList(){
            // 截图当前页面显示数据
            // 0,5
            // 5, 10
            // 10, 15
            this.dataList = this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );
        }
    },

    components: {
        FlightsListHead,
        FlightsItem
    },

    mounted(){

        // 请求机票列表
        this.$axios({
            url: "/airs",
            params: this.$route.query
        }).then(res => {
            // 总数据，（flights, info, options, total）
            this.flightsData = res.data;
            // 总条数
            this.total = this.flightsData.flights.length;

            // 第一页的数据
            this.setDataList();
        })
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