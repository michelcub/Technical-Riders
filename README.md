![Captura de pantalla 2023-08-25 175429](https://github.com/michelcub/proyecto-final-4geeks/assets/49735520/fdb64f54-6ed4-4f5c-8804-d49d924283d3)

# Technical Riders
Es una aplicacion social para la colaboracion entre bandas de musicos, promotores de slas de concierto y tecnicos de sonido, principalmente permite compartir los datos tecnicos requeridos para el concierto. Consta de un chat en tiempo real para la comunicacion entre profecionales y la posibilidad de gestionar bandas y salas, y poder compartir la informacion necesaria para que cada profesional realice su labor.

## Backend desde raiz:

```
pipenv install
pipenv shell
pipenv run start
```

## Frontend desde app:

```
npm install
npm run dev
_________________

Antes de ejecutar en el server de APP.py:

npm run build

```
## Migrate db
```
pipenv run init  -> para iniciar la db (solo se hace una vez)
pipenv run migrate -> registrar los cambios de la db
pipenv run upgrade -> aplicar los cambios en la db
pipenv  run downgrade -> deshacer el ultimo cambio de la db
```
