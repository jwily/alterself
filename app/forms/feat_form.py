from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class FeatForm(FlaskForm):
    name = StringField(validators=[DataRequired('Does your feature or trait have a name, other than "being awesome"?'), Length(
        max=255, message="What a name! Feature or trait names cannot exceed 255 characters."), ])
    description = StringField()
