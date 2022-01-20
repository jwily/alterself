from app.models import db, Character


def seed_characters():
    zexceed = Character(
        user_id=1,
        name='Zexceed',
        char_class='Druid',
        race='Dragonborn',
        background='Sailor (Pirate)',
    )

    db.session.add(zexceed)

    db.session.commit()


def undo_characters():
    db.session.execute('TRUNCATE characters RESTART IDENTITY CASCADE;')
    db.session.commit()
