from flask import Flask, request, jsonify, send_file
import subprocess
import asyncio
import os

app = Flask(__name__)

### async script runner

async def run_script(script_path):
    await subprocess.call(['python', script_path])
    return('Script executed successfully!')

###

# Members API Route

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

# Generate API route 
@app.route('/generate')
def generate():
    subprocess.call(['python', '../flask-server/pokemon-card-generator/src/generate.py'])
    return 'Script executed successfully!'

# render API route
@app.route('/render')
def render():
    subprocess.call(['python', '../flask-server/pokemon-card-generator/src/render_cards.py'])
    return 'Script executed successfully!'

@app.route('/photos')
def photos():
    folder_path = '../flask-server/pokemon-card-generator/gallery/renders'
    if not os.path.isdir(folder_path):
        return jsonify({'error': 'Invalid path provided'}),400
    
    # files = os.listdir(folder_path)
    # photos = [file for file in files]
    # return photos.body

    res = os.getcwd()
    # res = response.body
    return jsonify({"response":res})

if __name__ == "__main__":
    app.run(debug=True)