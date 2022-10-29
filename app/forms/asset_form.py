from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class AssetForm(FlaskForm):
    '''
    This asset form is used for transactions so quantity will be required
    DB however reflects that owner_id and quantity is a nullable field

    The nullable fields are for directly adding those assets to the DB
    for the sole purpose of using those assets as watchlist items
    '''
    owner_id = IntegerField('owner_id')
    asset_id = IntegerField('asset_id',
                            validators=[DataRequired()])
    symbol = StringField('symbol',
                            validators=[DataRequired()])
    name = StringField('name',
                            validators=[DataRequired()])
    type = StringField('type',
                            validators=[DataRequired()])
    quantity = FloatField('quantity',
                            validators=[DataRequired()])
