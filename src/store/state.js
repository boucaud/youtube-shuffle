export default {
  state: {
    videoIds: null,
  },
  getters: {
    getVideoIds(state) {
      return state.videoIds;
    },
  },
  mutations: {
    setVideoIds(state, ids) {
      state.videoIds = ids;
    },
  },
  actions: {},
};
