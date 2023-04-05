from flask import Blueprint
from app import finnhub_client


finnhub_routes = Blueprint('finnhub', __name__)


@finnhub_routes.route('/news')
def get_general_news():
    category = 'top news'
    news = finnhub_client.general_news(category, min_id = 0)
    '''
    returns a list of 100 news items
    news item is a dictionary in the form of

    news_item = {
        category: str
        datetime: UNIX timestamp
        headline: str
        id: int
        image: imageUrl str
        related: str
        source: str
        summary: str
        url: url str
        }

    '''

    return {'news' : news}
