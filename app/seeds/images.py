from app.models import db, Image


def seed_images():

    zexceed = Image(
        user_id=1,
        url='https://alterself.s3.us-west-1.amazonaws.com/zexceed.png'
    )

    himo = Image(
        user_id=1,
        url='https://alterself.s3.us-west-1.amazonaws.com/himo.jpg'
    )

    db.session.add(zexceed)
    db.session.add(himo)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
