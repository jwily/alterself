from app.models import db, Image, environment, SCHEMA


def seed_images():

    zexceed = Image(
        user_id=1,
        url='https://alterself.s3.us-west-1.amazonaws.com/zexceed.png'
    )

    himo = Image(
        user_id=1,
        url='https://alterself.s3.us-west-1.amazonaws.com/himo.jpg'
    )

    toland = Image(
        user_id=1,
        url='https://alterself.s3.us-west-1.amazonaws.com/toland.jpg'
    )

    db.session.add(zexceed)
    db.session.add(himo)
    db.session.add(toland)

    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
