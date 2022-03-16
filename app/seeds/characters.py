from app.models import db, Character


def seed_characters():

    zexceed = Character(
        user_id=1,
        image_id=1,
        campaign_id=2,
        name='Zexceed',
        char_class='Druid',
        race='Dragonborn',
        background='Pirate',
        strength=12,
        dexterity=15,
        constitution=16,
        intelligence=13,
        wisdom=16,
        charisma=11,
    )

    aylin = Character(
        user_id=1,
        name='Aylin Lightsworn',
        char_class='Paladin',
        race='Human',
        background='Noble',
        strength=15,
        dexterity=18,
        constitution=9,
        intelligence=12,
        wisdom=12,
        charisma=16,
    )

    himo = Character(
        user_id=1,
        image_id=3,
        name='Himo',
        char_class='Monk',
        race='Wood Elf',
        background='Hermit',
        strength=13,
        dexterity=18,
        constitution=14,
        intelligence=11,
        wisdom=15,
        charisma=12,
    )

    toland = Character(
        user_id=1,
        image_id=2,
        name='Toland Albios',
        char_class='Warlock',
        race='Half-Elf',
        background='Hermit',
        strength=9,
        dexterity=14,
        constitution=15,
        intelligence=15,
        wisdom=12,
        charisma=18,
    )

    advena = Character(
        user_id=1,
        name='Advena',
        char_class='Sorcerer',
        race='Half-Elf',
        background='Outlander',
        strength=11,
        dexterity=14,
        constitution=15,
        intelligence=10,
        wisdom=12,
        charisma=18,
    )

    db.session.add(zexceed)
    db.session.add(aylin)
    db.session.add(himo)
    db.session.add(toland)
    db.session.add(advena)

    db.session.commit()


def undo_characters():
    db.session.execute('TRUNCATE characters RESTART IDENTITY CASCADE;')
    db.session.commit()
