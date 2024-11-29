export const openDetail = (router: any, id: number, type: 'movie' | 'people' | 'collection' | 'comment' | 'article') => {
    if (type === 'movie') {
        router.push(`/contents/${id}`);
    } else if (type === 'people') {
        router.push(`/people/${id}`);
        console.log('people 상세');
    } else if (type === 'collection') {
        router.push(`/collection/${id}`);
        console.log('collection 상세');
    } else if (type === 'comment') {
        router.push(`/comment/${id}`);
        console.log('comment 상세');
    } else if (type === 'article') {
        router.push(`/article/${id}`);
        console.log('article 상세');
    } else {
        console.error('Invalid type:', type);
    }
};