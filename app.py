from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <html>
    <head>
        <title>My Python Web Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(to right, #00c6ff, #0072ff);
                color: white;
                text-align: center;
                padding: 50px;
            }
            h1 {
                font-size: 3em;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.2em;
            }
        </style>
    </head>
    <body>
        <h1>🚀 Welcome to My Web Page!</h1>
        <p>This page is powered by <b>Python & Flask</b>, running on my EC2 server.</p>
    </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
