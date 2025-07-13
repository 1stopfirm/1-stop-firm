@echo off
echo.
echo ========================================
echo    1StopFirm Development Server
echo ========================================
echo.
echo Starting server...
echo.
echo Server will be available at:
echo   http://localhost:8080
echo   http://127.0.0.1:8080
echo.
echo Available pages:
echo   • home: http://localhost:8080
echo   • About: http://localhost:8080/about
echo   • Services: http://localhost:8080/services
echo   • Blog: http://localhost:8080/blogs
echo   • Contact: http://localhost:8080/contact-us
echo.
echo Press Ctrl+C to stop the server
echo.
python server.py
pause 