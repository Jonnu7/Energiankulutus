import os
from flask import Flask, render_template, send_from_directory
from datacall import main

app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def index():    
        
    to_send_obj=main()
    print(to_send_obj)
                 
    return render_template('index.html', to_send=to_send_obj)

@app.route('/favicon.ico') 
def favicon(): return send_from_directory(os.path.join(app.root_path, 'static'),'favicon.ico', mimetype='image/vnd.microsoft.icon')

index()

if __name__ == "__main__":
        app.run(debug=True)