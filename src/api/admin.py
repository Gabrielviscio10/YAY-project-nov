  
import os
from flask_admin import Admin
from .models import db, User, Intereses, Eventos, Entidad, Partners, Usuarios , Inscripciones , UsuariosIntereses
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Entidad, db.session))
    admin.add_view(ModelView(Intereses, db.session))
    admin.add_view(ModelView(Eventos, db.session))
    admin.add_view(ModelView(Partners, db.session))
    admin.add_view(ModelView(Usuarios, db.session))
    admin.add_view(ModelView(Inscripciones, db.session))
    admin.add_view(ModelView(UsuariosIntereses, db.session))
    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))