import { shuffleArray } from "@helpers/shuffle";
import axios from "axios";

export default {
  state: {
    urlIdArray: null,
    playlistInformation: {},
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
    getPlaylistInformation(state) {
      return state.playlistInformation;
    },
  },
  mutations: {
    incrementCurrentVideoIndex(state) {
      ++state.currentVideoIndex;
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
    setPlaylistInformation(state, { id, information }) {
      state.playlistInformation = Object.assign({}, state.playlistInformation, {
        [id]: information,
      });
    },
  },
  actions: {
    async fetchPlaylistInformation({ state, commit }) {
      state.urlIdArray.forEach((id) => {
        const apiRoot = `${window.origin}/api/info?playlistId=${id}`;
        axios.get(apiRoot).then((response) => {
          if (response.status === 200) {
            commit("setPlaylistInformation", {
              id,
              information: response.data,
            });
          }
        });
      });
    },
    async shuffleVideos({ state, commit }) {
      const newArray = [...state.videoArray];
      shuffleArray(newArray);
      commit("setVideoArray", Object.freeze(newArray));
      commit("setVideoIndex", 0);
    },
    nextVideo({ state, rootGetters, commit }) {
      if (
        state.currentVideoIndex < state.videoArray.length - 1 &&
        rootGetters.getAutoPlayNextVideo
      ) {
        commit("incrementCurrentVideoIndex");
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
    async requestVideoArray({ commit, state }) {
      // await send request
      // TODO: put in helper, parametrize
      const results = [];
      const promises = state.urlIdArray.map((playlistId) => {
        const apiRoot = `${window.origin}/api/items?playlistId=${playlistId}`;
        return axios
          .get(apiRoot)
          .then((response) => {
            if (response.status === 200) {
              results.push(...response.data);
            } else {
              console.error(
                "cant fetch playlist items",
                response.status,
                response.statusText
              );
            }
          })
          .catch((error) => {
            console.error("Request failed", error);
          });
      });

      await Promise.all(promises);
      shuffleArray(results);
      commit("setVideoArray", Object.freeze(results));
    },
  },
};
