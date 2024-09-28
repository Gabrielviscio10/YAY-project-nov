"""empty message

Revision ID: 915431cd5f31
Revises: 4a3e5c85c038
Create Date: 2024-09-28 17:38:13.802676

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '915431cd5f31'
down_revision = '4a3e5c85c038'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('eventos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fecha', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('hora_inicio', sa.Time(), nullable=False))
        batch_op.add_column(sa.Column('hora_fin', sa.Time(), nullable=False))
        batch_op.add_column(sa.Column('ciudad', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('codigo_postal', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('accesibilidad', sa.Boolean(create_constraint=120), nullable=False))
        batch_op.add_column(sa.Column('dificultad', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('precio', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('cupo', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('observaciones', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('eventos', schema=None) as batch_op:
        batch_op.drop_column('is_active')
        batch_op.drop_column('observaciones')
        batch_op.drop_column('cupo')
        batch_op.drop_column('precio')
        batch_op.drop_column('dificultad')
        batch_op.drop_column('accesibilidad')
        batch_op.drop_column('codigo_postal')
        batch_op.drop_column('ciudad')
        batch_op.drop_column('hora_fin')
        batch_op.drop_column('hora_inicio')
        batch_op.drop_column('fecha')

    # ### end Alembic commands ###