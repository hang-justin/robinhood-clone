from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, DateTimeField
from wtforms.validators import DataRequired, ValidationError

class AssetForm(FlaskForm):
    party_id = IntegerField('party_id',
                            validators=[DataRequired()])
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
    total = FloatField('total',
                            validators=[DataRequired()])
    timestamp = DateTimeField('timestamp',
                            validators=[DataRequired()])
