import {Category} from './category.class';

export const jsonCategory1 = {
    'category': {
        'childCount': 1,
        'defaultName': 'toto',
        'description': 'toto is an issue category',
        'fillMethod': '',
        'headerImages': [{
            id: 'a'
        }, {
            id: 'b'
        }],
        'headerText': 'toto',
        'id': '1',
        'images': ['img1'],
        'index': '1000',
        'issueCount': 12,
        'itemsCount': 12,
        'kind': 'category',
        'mediaUrls': ['tttt'],
        'metadata': {},
        'name': 'coucou',
        'query': {},
        'typeContained': 'issue'
    }
};
export const jsonCategory2 = {
    'category': {
        'childCount': 1,
        'defaultName': 'tata',
        'description': 'tata is a title category',
        'fillMethod': '',
        'headerImages': [{
            id: 'a'
        }, {
            id: 'b'
        }],
        'headerText': 'tata',
        'id': '1',
        'images': ['img1'],
        'index': '1000',
        'issueCount': 12,
        'itemsCount': 12,
        'kind': 'category',
        'mediaUrls': ['tttt'],
        'metadata': {},
        'name': 'coucou',
        'query': {},
        'typeContained': 'title'
    }
};

export const category1 = new Category(jsonCategory1);
export const category2 = new Category(jsonCategory2);

export const createCategoryArray = (count = 10) => {
    const titleCategories: Category[] = [];
    for (let i = 0; i < count; i++) {
        titleCategories.push(i % 2 === 0 ? category1 : category2);
    }
    return titleCategories;
};

