@echo off
cd /d "%~dp0"

echo Compilando la web...
call npm run build
if errorlevel 1 goto error

echo Iniciando sesion en Firebase...
call npx firebase-tools@latest login
if errorlevel 1 goto error

echo Publicando Hosting en chef-privado...
call npx firebase-tools@latest deploy --only hosting --project chef-privado
if errorlevel 1 goto error

echo.
echo Hosting publicado: https://chef-privado.web.app
echo Cloud Functions no se publicaron.
pause
exit /b 0

:error
echo.
echo No se publico la web. Revisa el error anterior.
pause
exit /b 1
