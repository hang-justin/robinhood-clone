const LOAD_NEWS = 'news/LOAD_NEWS'


let initialState = {}


const loadNews = (news) => {
    return {
        type: LOAD_NEWS,
        news
    }
}


export const getGeneralNews = () => async dispatch => {

    const response = await fetch('/api/finnhub/news')

    if (response.ok) {
        const data = await response.json();
        // data.news is an array

        await dispatch(loadNews(data.news));
        return
    } else {
        const err = await response.json();
        console.log('err: ', err)
    }
}


const newsReducer = (state=initialState, action) => {
    let newState = {};

    switch(action.type) {
        case LOAD_NEWS:
            console.log('news data: ')
            console.log(action.news)

            action.news.forEach(news_item => {
                newState[news_item.id] = news_item
            })
            return newState;

        default:
            return state;
    }

}

export default newsReducer
