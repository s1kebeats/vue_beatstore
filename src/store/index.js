import { defineStore } from "pinia";

const publicPath = process.env.BASE_URL

export const useStore = defineStore('main', {
    state: () => {
        return {
            beat: {
                name: '',
                bpm: '',
                artist: 
                {
                  name: '',
                  id: 0,
                },
                wrap: ``,
                audio: {
                    mp3: ``,
                    wav: ``,
                }
                
            },
            playing: false,
            copy: false,
        }
    },
    actions: {
    }
})