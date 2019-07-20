<template>
    <div class="div">
    
        <div v-for="(item, index) in data" :key="index">
            {{ item.title }}

            <Item :data="item.children"/>
        </div>

    </div>
</template>

<script>
export default {
    // name属性是用于描述当前的组件
    // 可以当前组件自己调用自己。可以把Item当做是组件的名称来调用
    name: "Item",
    props: ["data"]
}
</script>

<style scoped>
.div div{
    margin-left:25px;
}
</style>
