from app.models import db, Skill


def seed_skills():
    zex1 = Skill(char_id=1, skill_num=2)
    zex2 = Skill(char_id=1, skill_num=4)
    zex3 = Skill(char_id=1, skill_num=11)
    zex4 = Skill(char_id=1, skill_num=12)

    ayl1 = Skill(char_id=2, skill_num=4)
    ayl2 = Skill(char_id=2, skill_num=7)

    himo1 = Skill(char_id=3, skill_num=1)
    himo2 = Skill(char_id=3, skill_num=12)
    himo3 = Skill(char_id=3, skill_num=16)
    himo4 = Skill(char_id=3, skill_num=17)

    tol1 = Skill(char_id=4, skill_num=3)
    tol2 = Skill(char_id=4, skill_num=5)
    tol3 = Skill(char_id=4, skill_num=8)
    tol4 = Skill(char_id=4, skill_num=10)
    tol5 = Skill(char_id=4, skill_num=11)
    tol6 = Skill(char_id=4, skill_num=15)

    adv1 = Skill(char_id=5, skill_num=3)
    adv2 = Skill(char_id=5, skill_num=4)
    adv3 = Skill(char_id=5, skill_num=7)
    adv4 = Skill(char_id=5, skill_num=13)
    adv5 = Skill(char_id=5, skill_num=17)
    adv6 = Skill(char_id=5, skill_num=18)

    db.session.add(zex1)
    db.session.add(zex2)
    db.session.add(zex3)
    db.session.add(zex4)

    db.session.add(ayl1)
    db.session.add(ayl2)

    db.session.add(himo1)
    db.session.add(himo2)
    db.session.add(himo3)
    db.session.add(himo4)

    db.session.add(tol1)
    db.session.add(tol2)
    db.session.add(tol3)
    db.session.add(tol4)
    db.session.add(tol5)
    db.session.add(tol6)

    db.session.add(adv1)
    db.session.add(adv2)
    db.session.add(adv3)
    db.session.add(adv4)
    db.session.add(adv5)
    db.session.add(adv6)

    db.session.commit()


def undo_skills():
    db.session.execute('TRUNCATE skills RESTART IDENTITY CASCADE;')
    db.session.commit()
