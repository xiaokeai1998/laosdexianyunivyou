<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
               {{  data.info.departCity }} - {{  data.info.destCity }} 
                / 
                {{  data.info.departDate }} 
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item, index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <!-- value = 0 , 6 -->
                    <el-option
                     v-for="(item, index) in data.options.flightTimes"
                    :key="index"
                    :label="`${ item.from }:00 - ${ item.to }:00`"
                    :value="`${ item.from },${  item.to }`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item, index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item, index) in airSizeList"
                    :key="index"
                    :label="item.type"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小

            airSizeList: [
                { type: "大", size: "L" } ,
                { type: "中", size: "M" } ,
                { type: "小", size: "S" } ,
            ],

            // 多选的条件
            filters: {
                company: { value: "", key: "airline_name" },
                airSize: { value: "", key: "plane_size" }
            }
        }
    },

    props: {
        // 接收flightsData
        data: {
            type: Object,
            default: { }
        }
    },

    methods: {
        // 多选的判断条件
        handleFilters(){
            const arr = this.data.flights.filter( v => {
                let pass = true;

               // 多个条件
               Object.keys( this.filters).forEach( item => {

                   if(  !this.filters[ item ].value ) return;

                   // 机票数据v能不能同时满足条件
                    if( v[ this.filters[ item ].key ]  !== this.filters[ item ].value ){
                        pass = false;
                    }
               } );

               return pass;
            } )
            return arr;
        },

        // 选择机场时候触发
        handleAirport(value){
            const arr = this.data.flights.filter( v => {
                return v.org_airport_name === value;
            } )

            // 得到一个过滤后的数组，传递回去给父组件
           this.$emit( "changeFlights", arr );
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            const [ from, to ] = value.split(","); // 6 12 -> 20

            const arr = this.data.flights.filter( v => {
                const [ start ] = v.dep_time.split(":");

                // 判断时候需要转换为数字
                return +from <= +start && +start < +to;
            })
            
            this.$emit( "changeFlights", arr );
        },

         // 选择航空公司时候触发
        handleCompany(value){

            // const arr = this.data.flights.filter( v => {
            //     return v.airline_name === value;
            // } )

            this.filters.company.value = value;

            const arr = this.handleFilters();

            // 得到一个过滤后的数组，传递回去给父组件
           this.$emit( "changeFlights", arr );

        },

         // 选择机型时候触发
        handleAirSize(value){

            //  const arr = this.data.flights.filter( v => {
            //     return v.plane_size === value;
            // } )      

             this.filters.airSize.value = value;

             const arr = this.handleFilters();

            // 得到一个过滤后的数组，传递回去给父组件
           this.$emit( "changeFlights", arr );
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport = "";       // 机场
            this.flightTimes = "";    // 出发时间
            this.company = "";       // 航空公司
            this.airSize = "";       // 机型大小
          
            this.$emit( "changeFlights",    this.data.flights);
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>