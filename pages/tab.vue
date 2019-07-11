<template>
    <div style="padding:50px">
       <div class="ctrl">
           <span v-for="(item, index) in ['新闻', '体育','军事']"
           :Key="index"
           @click="handleClick(index)"
           :class="{ active: index === current }">
            {{item}}
           </span>
       </div>

       <div v-if="current === 0">
           <ul>
               <li>为什么黄飞鸿来广州都带伞？</li>
               <li>为什么黄飞鸿来广州都带伞？</li>
               <li>为什么黄飞鸿来广州都带伞？</li>
           </ul>
       </div>

       <div  v-if="current === 1">
           <ul>
               <li>猛龙总冠军</li>
               <li>猛龙总冠军</li>
               <li>猛龙总冠军</li>
           </ul>
       </div>

       <div  v-if="current === 2">
           <ul>
               <li>伊朗同学可能击败什么无人机</li>
               <li>伊朗同学可能击败什么无人机</li>
               <li>伊朗同学可能击败什么无人机</li>
           </ul>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 非常重要的变量，记录当前显示的下标
            current: 0
        }
    },

    methods: {
        handleClick(index){
            this.current = index;
        }
    }
}
</script>

<style scoped>
.ctrl span{
    cursor: pointer;
}

.ctrl .active{
    color: red;
}
</style>
