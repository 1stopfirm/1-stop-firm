#!/usr/bin/env python3

import http.server
import socketserver
import socket
import webbrowser
from threading import Timer
import os
from urllib.parse import urlparse, unquote

class ModernHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def do_GET(self):
        # Clean and parse the URL
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path).rstrip('/')
        
        # URL routing map
        routes = {
            '': 'index.html',  # Root path
            '/': 'index.html',
            '/home': 'index.html',
            '/about': 'about.html',
            '/services': 'services.html',
            '/blogs': 'blogs.html',
            '/contact': 'contact-us.html',
            '/contact-us': 'contact-us.html',
            '/brand-development': 'brand-development.html',
            '/strategy': 'strategy-consultation.html',
            '/strategy-consultation': 'strategy-consultation.html',
            '/digital-marketing': 'digital-marketing-service.html',
            '/web-development': 'fresh-website-development.html',
            '/thank-you': 'thank-you.html'
        }

        # Check if path exists in routes
        if path in routes:
            self.path = '/' + routes[path]
        elif os.path.isfile(os.path.join(os.getcwd(), path.lstrip('/'))):
            # If it's a direct file request (like CSS, JS, images)
            self.path = path
        else:
            # Handle 404
            self.send_error(404, "Page not found")
            return

        try:
            return super().do_GET()
        except Exception as e:
            print(f"Error serving {self.path}: {e}")
            self.send_error(500, f"Internal server error: {str(e)}")

    def guess_type(self, path):
        """Override mime-type guessing to ensure proper content types."""
        mime_types = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.webp': 'image/webp',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject'
        }
        
        ext = os.path.splitext(path)[1].lower()
        if ext in mime_types:
            return mime_types[ext]
        return 'application/octet-stream'  # Default type

def find_free_port(start_port=8080):
    """Find a free port starting from the given port number."""
    port = start_port
    while port < 65535:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            port += 1
    raise RuntimeError('No free ports found')

def open_browser(port):
    """Open browser after server starts."""
    webbrowser.open(f'http://localhost:{port}')

def run_server():
    PORT = find_free_port()
    
    print(f'🚀 Starting server on port {PORT}...')
    try:
        with socketserver.TCPServer(("", PORT), ModernHandler) as httpd:
            print(f'✅ Server running at http://localhost:{PORT}')
            print('\n📍 Available Routes:')
            print('  • /home            - Home page')
            print('  • /about           - About page')
            print('  • /services        - Services overview')
            print('  • /blogs           - Blog posts')
            print('  • /contact         - Contact page')
            print('  • /brand-development    - Brand Development')
            print('  • /strategy        - Strategy Consultation')
            print('  • /digital-marketing    - Digital Marketing')
            print('  • /web-development - Web Development')
            print('\n💡 Press Ctrl+C to stop the server\n')
            
            # Open browser after a short delay
            Timer(1.5, open_browser, args=[PORT]).start()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n🛑 Server stopped by user')
    except Exception as e:
        print(f'❌ Error: {e}')
        if 'Address already in use' in str(e):
            print('💡 Another server is already running. Please stop it first.')

if __name__ == "__main__":
    run_server() 