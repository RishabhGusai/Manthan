@echo off
echo ========================================================
echo       Manthan Project - GitHub Upload Assistant
echo ========================================================
echo.
echo I have already prepared your local code repository.
echo.
echo STEP 1: Go to https://github.com/new and create a repository named 'manthan'.
echo.
set /p REPO_URL="STEP 2: Paste the HTTPS URL of your new repository here (e.g., https://github.com/username/manthan.git): "

if "%REPO_URL%"=="" goto error

echo.
echo Linking to %REPO_URL%...
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Pushing code to GitHub...
git push -u origin main

echo.
echo ========================================================
echo                 SUCCESS!
echo Your code should now be live on GitHub.
echo ========================================================
pause
exit

:error
echo.
echo Error: You must provide a repository URL.
pause
