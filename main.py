from website import create_app
import subprocess

# import logging, ngrok
# logging.basicConfig(level=logging.INFO)
# tunnel = ngrok.werkzeug_develop()


app = create_app()

if __name__ == '__main__':
    # app.run(port=80)
    app.run(debug=True)
    
# ngrok_process = subprocess.Popen(['ngrok', 'http', '5000'])

# try:
#     app.run()
# finally:
#     # Terminate Ngrok tunnel when Flask app is stopped
#     ngrok_process.terminate()    