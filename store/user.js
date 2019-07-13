// nuxt已经把store（vuex）关联到应用，只需要维护各个模块，
// 每个模块下面通常需要暴露三个属性

// state: 存数据
export const state = {
    userInfo: {
        token: "",
        user: {
            
        }
    },

    // userInfo: JSON.parse( window.localStorage.getItem("userInfo") ) || {}
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
export const actions = {}