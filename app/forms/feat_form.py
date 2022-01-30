from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class FeatForm(FlaskForm):
    name = StringField(validators=[DataRequired("Maybe just call it being awesome, but what's your feature or trait's name?"), Length(
        max=255, message="What a name! Feature or trait names cannot exceed 255 characters."), ])
    description = StringField()
