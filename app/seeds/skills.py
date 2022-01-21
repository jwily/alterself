from app.models import db, Skill


def seed_skills():
    zex1 = Skill(char_id=1, skill_num=2)
    zex2 = Skill(char_id=1, skill_num=4)
    zex3 = Skill(char_id=1, skill_num=11)
    zex4 = Skill(char_id=1, skill_num=12)

    db.session.add(zex1)
    db.session.add(zex2)
    db.session.add(zex3)
    db.session.add(zex4)

    db.session.commit()


def undo_skills():
    db.session.execute('TRUNCATE skills RESTART IDENTITY CASCADE;')
    db.session.commit()
