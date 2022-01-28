from app.models import db, Feature, Proficiency


def seed_pfts():

    zex1 = Proficiency(
        char_id=1,
        name='Languages',
        description='Common'
    )

    zex2 = Feature(
        char_id=1,
        name='Wild Shape'
    )

    db.session.add(zex1)
    db.session.add(zex2)

    db.session.commit()


def undo_pfts():
    db.session.execute('TRUNCATE proficiencies RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE features RESTART IDENTITY CASCADE;')
    db.session.commit()
