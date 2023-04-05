import { useSelector } from "react-redux"

import './NewsArticle.css'

const NewsArticle = ({ articleId }) => {
    const allArticles = useSelector(state => state.news)


    if (articleId === undefined) {
        console.log('RETURN A LOADING LOGO')
    }


    const article = allArticles[articleId]


    // in ms
    const units = {
        year  : 24 * 60 * 60 * 1000 * 365,
        month : 24 * 60 * 60 * 1000 * 365/12,
        day   : 24 * 60 * 60 * 1000,
        hour  : 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
    }


    const unixEpochTime = article.datetime * 1000;
    const elapsedTime = unixEpochTime - Date.now()


    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    let relativePublishDate


    for (let unit in units) {
        if (Math.abs(elapsedTime) > units[unit] || unit === 'second') {
            relativePublishDate = rtf.format(
                                        Math.round(elapsedTime/units[unit]),
                                        unit)
            break
        }
    }


    return (
        <>
            <a href={article.url} target='_blank'>
                <article className='article-card flx-row justify-space-btw'>
                    <div className="article-card--left flx-col space-evenly">
                        <div className='article-headline'>
                            {article.headline}
                        </div>

                        <p className='article-summary'>
                            {article.summary}
                        </p>

                        <div className='article-source-and-date'>
                            {article.source}, {relativePublishDate}
                        </div>
                    </div>

                    <div className="article-card--right flx-col-justify-ctr">
                        <img src={article.image} className="article-card-image" alt='article-img' />
                    </div>

                </article>
            </a>

            <div className='flx-row article-border'> </div>
        </>
    )
}

export default NewsArticle
