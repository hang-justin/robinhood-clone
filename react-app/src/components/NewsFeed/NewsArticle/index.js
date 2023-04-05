import { useSelector } from "react-redux"

const NewsArticle = ({ articleId }) => {
    const allArticles = useSelector(state => state.news)


    if (articleId === undefined) {
        console.log('RETURN A LOADING LOGO')
    }


    const article = allArticles[articleId]


    return (
        <article>
            {article.summary}
            <br/>
            <br/>
        </article>
    )
}

export default NewsArticle
