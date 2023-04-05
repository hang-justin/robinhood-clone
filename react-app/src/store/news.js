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
            action.news.forEach(news_item => {
                // Normalizing data
                newState[news_item.id] = news_item


                // Clean the headline
                // Some headlines start with ": "
                while ([":", " "].includes(newState[news_item.id].headline[0])) {
                    newState[news_item.id].headline = newState[news_item.id].headline.slice(1)
                }
                // if headline lenght is greater than 200, delete

                if (newState[news_item.id].headline.length >= 200) {
                    delete newState[news_item.id]
                }

            })
            return newState;

        default:
            return state;
    }

}

export default newsReducer
