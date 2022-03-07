from flask.cli import AppGroup
from .users import seed_users, undo_users
from .characters import seed_characters, undo_characters
from .skills import seed_skills, undo_skills
from .items import seed_items, undo_items
from .pfts import seed_pfts, undo_pfts
from .images import seed_images, undo_images


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_images()
    seed_characters()
    seed_skills()
    seed_items()
    seed_pfts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_pfts()
    undo_items()
    undo_skills()
    undo_characters()
    undo_images()
    undo_users()
    # Add other undo functions here
