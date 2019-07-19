export const state = () => {
    return {
        infoData: {
            seat_infos: {}
        }
    }
}

export const mutations = {
    // 设置机票信息
    setInfoData(state, data){
        state.infoData = data;
    }
}