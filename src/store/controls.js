export default {
  state: {
    loop: true,
    loopVideo: false,
    autoPlayNextVideo: true,
    darkTheme: false,
  },
  getters: {
    getLoop(state) {
      return state.loop;
    },
    getLoopVideo(state) {
      return state.loopVideo;
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
    setLoopVideo(state, value) {
      state.loopVideo = value;
    },
    setAutoPlayNextVideo(state, value) {
      state.autoPlayNextVideo = value;
    },
    setDarkTheme(state, value) {
      state.darkTheme = value;
      if (value) {
        localStorage.setItem('darkTheme', 'true');
      } else {
        localStorage.removeItem('darkTheme');
      }
    },
  },
  actions: {},
};
