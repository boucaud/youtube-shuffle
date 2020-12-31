import { shuffleArray } from "@helpers/shuffle";

const fixtureVideoArray = [
  {
    id: "KS2JZlhnN7c",
    name:
      "Anton Serra , Robse , Eddy , Marius B , Kalan et Hakan chez Oster Lapwass N°16022018",
    channel: "lapwass",
  },
  {
    id: "53I6fcFXqxo",
    name: "A. G. Cook - Silver (Official Video)",
    channel: "PC Music",
  },
  {
    id: "XYr5IC-mGi4",
    name: "Billy Talent - Saint Veronika - Official Video",
    channel: "Billy Talent",
  },
  {
    id: "8Lyvv_bhzD0",
    name: "100 gecs - sympathy 4 the grinch {VISUALIZER}",
    channel: "100 gecs",
  },
  {
    id: "qfn6xX0gZ_U",
    name:
      "90s Classic French Rap Mix (ft. Oxmo Puccino, La Rumeur, Lunatic, Shurik'n, Fabe..)",
    channel: "Magical Mystery Mix",
  },
  {
    id: "Xw5AiRVqfqk",
    name: "Aphex Twin - Selected Ambient Works 85-92",
    channel: "Aphex Twin",
  },
  {
    id: "WBUOrVHhJ8s",
    name: "Billy Talent - I Beg To Differ - Official Lyric Video",
    channel: "Billy Talent",
  },
];

export default {
  state: {
    urlIdArray: null,
    videoArray: null,
    currentVideoIndex: 0,
  },
  getters: {
    getUrlIdArray(state) {
      return state.urlIdArray;
    },
    getVideoIds(state) {
      return state.videoIds;
    },
    getVideoArray(state) {
      return state.videoArray;
    },
    getVideoAtIndex(state) {
      return (idx) => {
        if (state.videoArray && idx >= 0 && idx < state.videoArray.length) {
          return state.videoArray[idx];
        }
        return null;
      };
    },
    getCurrentVideoIndex(state) {
      return state.currentVideoIndex;
    },
    getCurrentVideoId(state, getters) {
      const video = getters.getVideoAtIndex(state.currentVideoIndex);
      if (video) {
        return video.id;
      }
      return null;
    },
  },
  mutations: {
    incrementCurrentVideoIndex(state) {
      ++state.incrementCurrentVideoIndex;
    },
    setVideoIndex(state, index) {
      if (index >= 0 && index < state.videoArray.length) {
        state.currentVideoIndex = index;
      }
    },
    setVideoIds(state, ids) {
      state.videoIds = ids;
    },
    setVideoArray(state, array) {
      state.videoArray = array;
    },
    setUrlIdArray(state, array) {
      state.urlIdArray = array;
    },
  },
  actions: {
    shuffleVideos({ state, commit }) {
      const newArray = [...state.videoArray];
      shuffleArray(newArray);
      commit("setVideoArray", newArray);
      commit("setVideoIndex", 0);
    },
    nextVideo({ state, rootGetters, commit }) {
      if (
        state.currentVideoIndex < state.videoArray.length - 1 &&
        rootGetters.getAutoPlayNextVideo
      ) {
        commit("incrementCurrentVideoIndex");
        state.currentVideoIndex++;
      } else if (rootGetters.getLoop) {
        commit("setVideoIndex", 0);
      }
    },
    handleLocation({ commit }) {
      const search = window.location.search;
      if (search && search.length) {
        const params = new URLSearchParams(search);
        if (params.has("id")) {
          const idList = params.getAll("id");
          if (idList && idList.length) {
            commit("setUrlIdArray", idList);
          }
        }
      }
    },
    async requestVideoArray({ commit }) {
      // await send request
      setTimeout(() => {
        commit("setVideoArray", fixtureVideoArray);
      }, 1000);
    },
  },
};
