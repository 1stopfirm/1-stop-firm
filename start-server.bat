@echo off
echo Starting 1StopFirm Development Server...
echo.
echo Server will be available at:
echo http://localhost:8080
echo http://127.0.0.1:8080
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8080 --bind 127.0.0.1
pause 