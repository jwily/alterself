from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class ProfForm(FlaskForm):
    name = StringField(validators=[DataRequired("Your profiencies need names, no need to be humble!"), Length(
        max=255, message="What a name! Proficiency names cannot exceed 255 characters."), ])
    description = StringField()
