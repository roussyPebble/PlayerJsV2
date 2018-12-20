/**
 * @namespace store
 */
var InitialState = {
    configurations: {
        width: '100%',
        teaser: 'https://s.radio-canada.ca/player/ressources/svg/default_bg.svg',
        browser: {
            name: '',
            version: '',
            os: ''
        },
        windowStorageReady: false
    },
    userParams: {
        integrationParams: {},
        bambouParams: {}
    },
    metaMedia: {
        metaLoaded: false,
        metas: []
    },
    media: {
        idMedia: null,
        appCode: null,
        isLive: false,
        time: 0,
        restoring: false,
        restoringTime: null
    },
    playerState: {
        uuid: -1,
        playing: false,
        canPlay: false,
        isReady: false,
        playedOnce: false,
        mouseOver: false,
        ctrlKeyboardFocused: false,
        sizes: {},
        reduced: false,
        fullscreen: false,
        selectingBitrate: false,
        videoDescriptionActive: false,
        infoDisplayed: false,
        thumbnail: {
            mediaPosition: -1,
            xPosition: -1,
            yPosition: -1
        },
        volume: {
            level: 0.8,
            mute: false,
            btnIsHover: false
        },
        error: {
            code: 0,
            message: null
        }
    },
    validationMedia: {
        data: {},
        dataLoaded: false,
        bitrates: []
    },
    providers: {
        type: 'html',
        providerReady: false,
        mediaPlaying: false,
        subtitlesActive: false,
        subtitlesUrl: null,
        currentBitrate: {
            bitrate: 0,
            lines: 'Auto'
        }
    },
    event: {
        name: null,
        timestamp: (new Date()).getTime(),
        data: null
    }
};

export default InitialState;