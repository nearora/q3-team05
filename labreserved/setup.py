from setuptools import setup

setup(
    name='labreserved',
    version='0.1.0',
    long_description=__doc__,
    packages=['labreserved'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Flask',
        'Flask-RESTful',
        'flask-restful-swagger',
        'requests'
    ]
)
