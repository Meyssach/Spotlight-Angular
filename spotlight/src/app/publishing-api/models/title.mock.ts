import { Title } from './title.class';
import {CCTitle} from './cc-title.interface';

export const jsonTitle1: CCTitle = {
    'title': {
        'id': 'com.aquafadas.alientaeditorial',
        'defaultName': 'Alienta Editorial',
        'name': 'al',
        'description': 'al',
        'headerText': 'al',
        'creationDate': '1544770982',
        'categories': [],
        'iconId': '5431725',
        'products': [],
        'languageCode': 'es',
        'version': '2',
        'icons': ['5431725'],
        'headerImages': ['5431726'],
        'metadata': {
            'hideMoreIssues': false,
            'physicalData': {
                'cover': {
                    'width': '210',
                    'height': '297'
                },
                'header': {
                    'textColor': '#000000',
                    'heights': {
                        '1': 130,
                        '5': 145,
                        '7': 250
                    }
                }
            },
            'isSunday': false,
            'AppleRoomEnabled': false,
            'excluded': false,
            'periodicity': 'None'
        },
        'periodicity': 'None',
        'type': 'MAGAZINE'
    }
} as CCTitle;
export const jsonTitle2: CCTitle = {
    'title': {
        'id': 'com.aquafadas.austral',
        'defaultName': 'Austral',
        'name': 'Austral',
        'description': 'Austral',
        'headerText': 'Austral',
        'creationDate': '1544775138',
        'categories': [],
        'iconId': '5431729',
        'products': [],
        'languageCode': 'es',
        'version': '2',
        'icons': ['5431729'],
        'headerImages': ['5431730'],
        'metadata': {
            'hideMoreIssues': false,
            'physicalData': {
                'cover': {
                    'height': '210',
                    'width': '297'
                },
                'header': {
                    'textColor': '#000000',
                    'heights': {
                        '1': 130,
                        '5': 145,
                        '7': 250
                    }
                }
            },
            'isSunday': false,
            'AppleRoomEnabled': false,
            'excluded': false,
            'periodicity': 'None'
        },
        'periodicity': 'None',
        'type': 'MAGAZINE'
    }
} as CCTitle;

export const title1 = new Title(jsonTitle1);
export const title2 = new Title(jsonTitle2);

export const createTitlesArray = (count = 10) => {
    const titles: Title[] = [];
    for (let i = 0; i < count; i++) {
        titles.push(i % 2 === 0 ? title1 : title2);
    }
    return titles;
};
