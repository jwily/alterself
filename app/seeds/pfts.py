from app.models import db, Feature, Proficiency


def seed_pfts():

    zex1 = Proficiency(
        char_id=1,
        user_id=1,
        name='Languages',
        description='Common'
    )

    zex2 = Feature(
        char_id=1,
        user_id=1,
        name='Wild Shape',
        description='',
    )

    ayl1 = Proficiency(
        char_id=2,
        user_id=1,
        name='Languages',
        description='Common'
    )

    ayl2 = Feature(
        char_id=2,
        user_id=1,
        name='Healing Hands',
        description='',
    )

    himo1 = Proficiency(
        char_id=3,
        user_id=1,
        name='Languages',
        description='Common'
    )

    himo2 = Feature(
        char_id=3,
        user_id=1,
        name='Darkvision',
        description='',
    )

    tol1 = Proficiency(
        char_id=4,
        user_id=1,
        name='Languages',
        description='Common'
    )

    tol2 = Feature(
        char_id=4,
        user_id=1,
        name='Agonizing Blast',
        description='',
    )

    adv1 = Proficiency(
        char_id=5,
        user_id=1,
        name='Languages',
        description='Common'
    )

    adv2 = Feature(
        char_id=5,
        user_id=1,
        name='Wild Magic',
        description='',
    )

    db.session.add(zex1)
    db.session.add(zex2)
    db.session.add(ayl1)
    db.session.add(ayl2)
    db.session.add(himo1)
    db.session.add(himo2)
    db.session.add(tol1)
    db.session.add(tol2)
    db.session.add(adv1)
    db.session.add(adv2)

    db.session.commit()


def undo_pfts():
    db.session.execute('TRUNCATE proficiencies RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE features RESTART IDENTITY CASCADE;')
    db.session.commit()
