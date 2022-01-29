from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class FeatProfForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(
        max=255, message='Feature or Proficiency name cannot exceed 255 characters'), ])
    description = StringField()
