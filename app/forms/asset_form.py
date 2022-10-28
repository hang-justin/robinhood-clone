from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class AssetForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    asset_id = IntegerField('asset_id',
                            validators=[DataRequired()])
    symbol = StringField('symbol',
                            validators=[DataRequired()])
    name = StringField('name',
                            validators=[DataRequired()])
    type = StringField('type',
                            validators=[DataRequired()])
    quantity = FloatField('quantity')
