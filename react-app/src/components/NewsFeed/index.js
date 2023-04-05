

import { useSelector } from 'react-redux';
import './NewsFeed.css'
import { useEffect, useState } from 'react';
import NewsArticle from './NewsArticle';

const getArticleIds = (newsFeedPage, articles, articlesPerPage) => {
    const allArticleIds = Object.keys(articles);
    let articleIds = Array(articlesPerPage);

    for (let i = 0; i < articlesPerPage; i++) {
        let articleIndex = newsFeedPage * articlesPerPage + i

        if (articleIndex >= allArticleIds.length) {
            console.log(articleIds)
            return articleIds
        }

        articleIds[i] = allArticleIds[articleIndex]
    }

    return articleIds;
}

const NewsFeed = () => {
    const [newsFeedPage, setNewsFeedPage] = useState(0);
    const [articlesPerPage, setArticlesPerPage] = useState(5);

    const articles = useSelector(state => state.news);

    let articleIds = getArticleIds(newsFeedPage, articles, articlesPerPage)

    useEffect(() => {
        articleIds = getArticleIds(newsFeedPage, articles, articlesPerPage)
    }, [newsFeedPage])

    // -1 since articlePage is 0-indexed
    const lastArticlePage = (Object.keys(articles).length / 5) - 1

    console.log(articles)


    return (
        <div className='flx-col'>
            <div className='news-header font-size-30'>News</div>

            {articleIds &&
                articleIds.map( articleId => (
                    <NewsArticle key={articleId} articleId={articleId} />
                ))
            }
        </div>
    )
}

export default NewsFeed
