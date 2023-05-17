from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import subprocess
import asyncio
import os
import json
import base64
from flask_cors import CORS
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER= './output/pokemon-classic/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

### async script runner

async def run_script(script_path):
    await subprocess.call(['python', script_path])
    return('Script executed successfully!')

###

# Members API Route

@app.route("/")
def description():
    return "This is the generate API from the card_gen"

@app.route("/members", methods=['GET', 'POST'])
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

# Generate API route 
@app.route('/generate', methods=['GET'])
def generate():
    element = request.args.get("element", default="", type=str)
    subject = request.args.get("subject", default="", type=str)
    returnData = subprocess.call(['python', './src/generate.py', '-e', element ,'--subject', subject])

    return jsonify({"data":returnData})

# render API route
@app.route('/render')
def render():
    encoded_images = []
    ##print("we only want one card to render by ")
    subprocess.call(['python', './src/render_cards.py'])

    #print("😘😘😘😘😘😘")
    #output = subprocess.check_output(['python', './src/render_cards.py'])
    #print(output)
    ###print("above is the output")
    ##print("😘😘😘😘😘😘")
    #return 'Script executed successfully!'

    # Split the output by newline character
    ##image_strings = output.split(b'\n')
    # Get the first image string
    # first_image_string = image_strings[0]
    # print(first_image_string)

    # encoded_images.append(first_image_string.decode('utf-8'))
    return jsonify({"response":encoded_images})

# Fetching pokemon image prompts
@app.route('/prompts')
def prompts():
    folder_path = './output/pokemon-classic/cards'
    file_contents = []
    for filename in os.listdir(folder_path):
        filepath = f"./output/pokemon-classic/cards/{filename}"
        with open(filepath, "r") as file:
            # contents = file.read()
            contents = json.load(file)
        # print (contents)
        # "image_file": "001_armorgon.png"
        ##print(contents["image_file"]) send back to rename file
        file_contents.append({"Name":contents['name'], "Prompt":contents['image_prompt'], "Image_file":contents['image_file']})
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
    ##print("we only want one card to render by passing this endpoint a state with the photo name saved from the first part")
    # Path to our photos
    folder_path = './output/pokemon-classic/renders'
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