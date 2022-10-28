from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist

def unique_watchlist_name_for_user(form, field):
    user_id = form.data['owner_id']
    name = field.data
    watchlist_name_used = Watchlist.query.filter(Watchlist.owner_id == user_id, Watchlist.name == name).first()

    if watchlist_name_used:
        raise ValidationError("You've already used that name. Try another.")


class WatchlistForm(FlaskForm):
    owner_id = StringField('owner_id',
                            validators=[DataRequired()])
    name = StringField('name',
                            validators=[DataRequired(), unique_watchlist_name_for_user])
