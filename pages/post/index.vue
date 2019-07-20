<template>
    <div style="padding:50px;" >
        <h1>组件递归</h1>

        <Item :data="list"/>
    </div>
</template>

<script>
import Item from "@/components/post/item"

export default {
    components: {
        Item
    },
    data(){
        return {

            // 商品分类的数据
            list: [
                { 
                    title: "衣服", 
                    children: [
                        { title: "男装", children: [
                            { title: "上衣", children: [
                                { title: "衬衫" },
                                { title: "背心" }
                            ] },
                            { title: "裤子" , children: [
                                { title: "牛仔裤" },
                                { title: "丁字裤" }
                            ]}
                        ] },
                        { title: "女装", children: [
                            { title: "上衣", children: [
                                { title: "碎花裙" },
                                { title: "吊带裙" }
                            ] },
                            { title: "裤子" , children: [
                                { title: "短裤" },
                                { title: "小脚裤" }
                            ]}
                        ] }
                    ]
                },
                { title: "电器", children: [
                    { title: "空调" },
                    { title: "电视", children: [
                        { title: "彩电" },
                        { title: "黑白电视" } 
                    ] }
                ] }
            ]

        }
    }
}
</script>

<style>

</style>
