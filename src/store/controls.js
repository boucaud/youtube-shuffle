export default {
  state: {
    loop: true,
    autoPlayNextVideo: true,
    darkTheme: false,
  },
  getters: {
    getLoop(state) {
      return state.loop;
    },
    getAutoPlayNextVideo(state) {
      return state.autoPlayNextVideo;
    },
    getDarkTheme(state) {
      return state.darkTheme;
    },
  },
  mutations: {
    setLoop(state, value) {
      state.loop = value;
    },
    setAutoPlayNextVideo(state, value) {
      state.autoPlayNextVideo = value;
    },
    setDarkTheme(state, value) {
      state.darkTheme = value;
    },
  },
  actions: {},
};
