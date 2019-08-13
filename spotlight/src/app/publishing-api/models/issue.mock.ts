import {Issue} from './issue.class';

export const jsonIssue1 = {
    'issue': {
        'id': '4A4D0387E848183B5404858185FE3CC9',
        'externalId': '9788417568542',
        'titleId': '12568',
        'titleName': 'Alienta Editorial',
        'titleBundleId': 'com.aquafadas.alientaeditorial',
        'titleExternalId': null,
        'name': 'Un mundo mejor es posible',
        'defaultName': 'Un mundo mejor es posible',
        'test': false,
        'description': 'toto',
        'htmlDescription': '<p>toto</p>',
        'version': '4',
        'typeId': '82999',
        'publicationDate': '1559001600',
        'endDate': null,
        'acquired': false,
        'acquirableViaSubsciption': false,
        'availability': 'READYFORSALE',
        'headlines': [],
        'number': '6076',
        'hasSummary': false,
        'inAppLibrary': false,
        'sources': [],
        'webSources': [],
        'openbookSources': [
            {
                'issueId': '4A4D0387E848183B5404858185FE3CC9',
                'manifestId': '1692850',
                'url': 'ca1356aaadf1c94bd6a2991e9751d968',
                'type': 'CONTENT',
                'kind': 'DEFAULT',
                'version': null,
                'fileSize': 0,
                'format': null,
                'isHosted': false,
                'id': '13165',
                'contentType': 'content\/openbook'
            }
        ],
        'isExternalAcquisition': false,
        'restrictedAccess': true,
        'resources': {
            'thumbnailId': '5453725',
            'summaryId': null,
            'coverId': '5453724',
            'thumbnailIds': [
                '5453725'
            ],
            'summaryIds': [],
            'coverIds': [
                '5453724'
            ],
            'previewIds': []
        },
        'sku': '',
        'productType': 'FREE',
        'metadata': {
            'author': [
                {
                    'role': 'author',
                    'lastname': 'Padre Ángel',
                    'biography': 'tatata'
                }
            ],
            'biography': [
                'tututu'
            ],
            'kind': [
                'Self-help & personal development'
            ],
            'store': [
                'Andorra',
                'United Arab Emirates',
                'Afghanistan',
                'Antigua and Barbuda',
            ],
            'identifier': [
                {
                    'name': 'identifier',
                    'value': '9788417568542'
                }
            ],
            'publisher': {
                'lastname': 'Grupo Planeta'
            },
            'language': 'spa',
            'keyword': [
                'Alienta Editorial',
                'Actualidad',
            ],
            'sanoma_pdf_file': '\/9788417568\/9788417568542.epub',
            'sanoma_title_id': 'com.aquafadas.alientaeditorial',
            'ingestingType': '2',
            'subtitle': 'Cómo podemos ayudar a los más desfavorecidos',
            'pagecount': '108'
        }
    }
};

export const jsonIssue2 = {
    issue: {
        id: '080B391C6EA8705AD42B8D363A58E24F',
        externalId: 'com.aquafadas.com',
        titleId: '7450',
        titleName: 'SeventeenTEST12',
        titleBundleId: 'com.aquafadas.seventeen',
        titleExternalId: 'com.devfrontend.seventeen',
        name: 'Seventeen #39 (Test Deeplink Step3)',
        defaultName: 'Seventeen #39 (Test Deeplink Step3)',
        test: false,
        description: 'Test',
        htmlDescription: '<p>Test</p>',
        version: '5',
        typeId: '27878',
        publicationDate: '1449097200',
        endDate: null,
        acquired: true,
        acquirableViaSubsciption: false,
        availability: 'READYFORSALE',
        headlines: [],
        number: '39',
        hasSummary: false,
        inAppLibrary: false,
        sources: [
            {
                id: '168478',
                type: 'CONTENT',
                kind: 'DEFAULT',
                version: '3',
                issueId: '080B391C6EA8705AD42B8D363A58E24F',
                filesize: 6497058,
                screenSize: 'xlarge',
                manifestId: '3752',
                resolution: '0x0',
                screenDensity: 'hdpi',
                format: 'epub',
                diagonal: '9',
                isHosted: false,
            },
        ],
        webSources: [
            {
                id: '112009',
                type: 'CONTENT',
                kind: 'DEFAULT',
                contentType: 'reader/html',
                format: null,
                url: 'http://frontend.aquafadas.com',
            },
        ],
        openbookSources: [],
        isExternalAcquisition: false,
        restrictedAccess: false,
        resources: {
            thumbnailId: '959771',
            summaryId: null,
            coverId: '959770',
            thumbnailIds: ['959771'],
            summaryIds: [],
            coverIds: ['959770'],
            previewIds: [],
        },
        sku: '',
        metadata: {
            exportableContent: {
                printable: false,
                downloadable: false,
            },
            censored: true,
            rating: '1',
            type: 'comics',
            language: 'en',
            readingDirection: 'ltr',
            requireAuthentication: false,
            b2b: false,
        },
    },
};

export const issue1 = new Issue(jsonIssue1);
export const issue2 = new Issue(jsonIssue2);

export const createIssueArray = (count = 10) => {
    const titleIssues: Issue[] = [];
    for (let i = 0; i < count; i++) {
        titleIssues.push(i % 2 === 0 ? issue1 : issue2);
    }
    return titleIssues;
};
