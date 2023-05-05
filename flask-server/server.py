from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import subprocess
import asyncio
import os
import json
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER= '../flask-server/card-generator/output/pokemon-classic/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

### async script runner

async def run_script(script_path):
    await subprocess.call(['python', script_path])
    return('Script executed successfully!')

###

# Members API Route

@app.route("/")
def description():
    return "This is the generate API"

@app.route("/members", methods=['GET', 'POST'])
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

# Generate API route 
@app.route('/generate', methods=['GET'])
def generate():
    element = request.args.get("element", default="", type=str)
    subject = request.args.get("subject", default="", type=str)
    returnData = subprocess.call(['python', '../flask-server/card-generator/src/generate.py', '-e', element ,'--subject', subject])
    print(returnData)

    return jsonify({"data":returnData})

# render API route
@app.route('/render')
def render():
    subprocess.call(['python', '../flask-server/card-generator/src/render_cards.py'])
    return 'Script executed successfully!'

# Fetching pokemon image prompts
@app.route('/prompts')
def prompts():
    folder_path = '../flask-server/card-generator/output/pokemon-classic/cards'
    file_contents = []
    for filename in os.listdir(folder_path):
        filepath = f"./card-generator/output/pokemon-classic/cards/{filename}"
        with open(filepath, "r") as file:
            # contents = file.read()
            contents = json.load(file)
        # print (contents)
        file_contents.append({"Name":contents['name'], "Prompt":contents['image_prompt']})
    return jsonify({"response":file_contents})
    # return file_contents

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    print("🏆","upload success")
    return jsonify({"response": request.form})

@app.route('/photos')
def photos():
    # Path to our photos
    folder_path = '../flask-server/card-generator/output/pokemon-classic/renders'
    if not os.path.isdir(folder_path):
        return jsonify({'error': 'Invalid path provided'}),400
    # Encoded image array
    encoded_images = []

    for filename in os.listdir(folder_path):
        with open(os.path.join(folder_path, filename), 'rb') as image_file:
                # read the image data
            image_data = image_file.read()
                # encode the image data as Base64
            encoded_image = base64.b64encode(image_data).decode('utf-8')
                # append the encoded image to the list of encoded images
            encoded_images.append(encoded_image)

    return jsonify({"response":encoded_images})


if __name__ == "__main__":
    app.run(debug=True)