import { mapState, mapMutations } from "vuex";

// nuxt已经把store（vuex）关联到应用，只需要维护各个模块，
// 每个模块下面通常需要暴露三个属性

// state: 存数据
export const state = () => {
    return {
        userInfo: {
            token: "",
            user: {
                
            }
        },
    
        // userInfo: JSON.parse( window.localStorage.getItem("userInfo") ) || {}
    }    
}

// mutations：同步设置修改state的数据
export const mutations = {
    // 设置用户的数据
    setUserInfo(state, data){
        state.userInfo = data;

        // 保存到本地
        //localStorage.setItem("userInfo",  JSON.stringify(data) );
    },

    // 清除用户数据
    clearUserInfo(state){
        state.userInfo = {
            token: "",
            user: {}
        }
    }
}

// actions: 异步设置修改state的数据
export const actions = {
    // 负责登录的请求
    // 第一个参数是store对象
    // 第二个参数
    login( { commit }, data){

        // 登录的接口
        this.$axios({
            url: "/accounts/login",
            method: "POST",
            data,
        }).then(res => {

            // 把数据保存到vuex,user是模块名字（命名空间）
            commit("setUserInfo", res.data);
        })
    },

    register(){}
}