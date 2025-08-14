"# prueba_tecnica_canopia" 
# Inicializar docker con base de datos
- docker-compose ps
- instalar dbeaver desde: https://dbeaver.io/download/
- Crear nueva conexión con dbeaver:
    - database name: BDPruebaTecnica_Canopia
    - database password: root_password_segura
    - En la pestaña drivers properties: allowPublicKeyRetrieval=TRUE
    - En la pestaña scripts copiar y ejecutar los scripts de db-scripts.txt

# Inicializar backend
- cd backend
- npm install
- npm run start