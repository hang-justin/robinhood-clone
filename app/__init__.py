import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from datetime import datetime
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.asset_route import asset_routes
from .api.transaction_routes import transaction_routes
from .api.watchlist_routes import watchlist_routes
from .api.cg_routes import cg_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(asset_routes, url_prefix='/api/assets')
app.register_blueprint(transaction_routes, url_prefix='/api/transactions')
app.register_blueprint(watchlist_routes, url_prefix='/api/watchlists')
app.register_blueprint(cg_routes, url_prefix='/api/cg')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

# @app.route('/api/testcg')
# def get_market_chart_range():
#     '''
#     this route will give btc price from inception to date until now
#     '''
#     response =  cg.get_coin_market_chart_range_by_id(
#                                                     id='bitcoin',
#                                                     vs_currency='usd',
#                                                     from_timestamp=1392577232,
#                                                     to_timestamp=datetime.now().timestamp()
#                                                     )


#     for key in response:
#         # print(key == 'prices')
#         pass

#     # converted_data = [ [datetime.fromtimestamp(timestamp), price] for [timestamp, price] in response['prices'] ]

#     first_timestamp = response['prices'][0][0]
#     last_timestamp = response['prices'][ len(response['prices']) - 1][0]

#     # print(first_timestamp)
#     # print(last_timestamp)


#     return response
