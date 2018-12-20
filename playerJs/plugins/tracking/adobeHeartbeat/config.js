import appConfig from '../../../config';

export const AdobeCongig = {
    environnement: appConfig.environnement,
    playerName: 'radio-canada-player',
    trackingServer: 'radiocanada.122.2o7.net',
    marketingCloudOrgID: '55E654E45894AF350A495CFE@AdobeOrg',
    rsid: 'rc-dev05',
    streamType: {
        vod: 'VOD',
        live: 'LIVE',
        linear: 'LINEAR',
        aod: 'AOD',
        audiobook: 'AUDIOBOOK',
        podcast: 'PODCAST'
    }
};

export const mediaMarque = {
    premiere: [
        'CBAF',
        'CBAFC',
        'CBAFH',
        'CBEF',
        'CBF',
        'CBF_Rouyn',
        'CBF_SHR',
        'CBF_TR',
        'CBGA',
        'CBJ',
        'CBKF',
        'CBOF',
        'CBON',
        'CBSI',
        'CBUF',
        'CBV',
        'CHFA',
        'CHLM',
        'CJBC',
        'CJBR',
        'CKSB'
    ],
    icimusique: [
        'CBFX',
        'Espace_mu'
    ],
    rdi: ['RDI'],
    cbc: ['CBCMUSIC'],
    rci: [
        'RCI_AR',
        'RCI_CH',
        'RCI_EN',
        'RCI_ES',
        'RCI_FR'
    ],
    artv: ['ARTV'],
    tqc: ['Télé-Québec'],
    icitele: [
        'CBAFT',
        'CBFT',
        'CBKFT',
        'CBOFT',
        'CBUFT',
        'CBVT',
        'CBWFT',
        'CBXFT',
        'CJBCT',
        'CJBRT',
        'CKRS',
        'CKSH',
        'CKTM'
    ],
    explora: ['Explora'],
    balado: ['CBF_Balado'],
    web: [
        'ExclusifWebAudio',
        'ExclusifWebVideo'
    ],
    toutv: [
        'Tou.tv',
        'Tou.tv extra'
    ]
};