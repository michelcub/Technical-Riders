![Captura de pantalla 2023-08-25 175429](https://github.com/michelcub/proyecto-final-4geeks/assets/49735520/fdb64f54-6ed4-4f5c-8804-d49d924283d3)

# proyecto-final-4geeks

Proyecto final de @michelcub, @RofinhoOo y @danilopgon

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
