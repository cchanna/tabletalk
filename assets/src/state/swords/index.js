import { combineReducers } from 'redux';

const LOAD = "LOAD";

export const actions = {
  load: [LOAD]
}

export const types = {
  LOAD
}

export const reducer = combineReducers({
  characterIds: (state = [0, 1, 2], action) => {
    switch(action.type) {
      default:
        return state;
    } 
  },
  charactersById: (state = {
    0: {
      name: "Candor",
      eidolon: {
        name: "The Giant's Skull",
        link: "https://i.pinimg.com/originals/02/67/db/0267db586732b5f573ba373da87e7182.jpg",
        isImage: true
      },
      names: [
        "My sword, dawnslayer",
        "My baby daughter Raze",
        "My homeland, Al-Tanoth"
      ],
      glumFeat: "Gazing at the horizon",
      jovialFeat: "Laughing at the sight of blood",
      skill: {
        name: "Skill",
        description: "Description"
      }
    },
    1: {
      name: "Candor",
      eidolon: {
        name: "The Giant's Skull",
        link: "https://i.pinimg.com/originals/02/67/db/0267db586732b5f573ba373da87e7182.jpg",
        isImage: true
      },
      names: [
        "My sword, dawnslayer",
        "My baby daughter Raze",
        "My homeland, Al-Tanoth"
      ],
      glumFeat: "Gazing at the horizon",
      jovialFeat: "Laughing at the sight of blood",
      skill: {
        name: "Skill",
        description: "Description"
      }
    },
    2: {
      name: "Candor",
      eidolon: {
        name: "The Giant's Skull",
        link: "https://i.pinimg.com/originals/02/67/db/0267db586732b5f573ba373da87e7182.jpg",
        isImage: true
      },
      names: [
        "My sword, dawnslayer",
        "My baby daughter Raze",
        "My homeland, Al-Tanoth"
      ],
      glumFeat: "Gazing at the horizon",
      jovialFeat: "Laughing at the sight of blood",
      skill: {
        name: "Skill",
        description: "Description"
      }
    },
  }, action) => {
    switch(action.type) {
      default:
        return state;
    } 
  }
});

export const selectors = {

}