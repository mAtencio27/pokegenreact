from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import subprocess
import asyncio
import os
import json
import base64
from flask_cors import CORS
from io import BytesIO
import io
from PIL import Image, ImageFont, ImageDraw
import argparse
import pathlib

#### modules to run render_cards.py module and generate.py module
from src.generate import main_generate
from src.generate_jp import main_generate_jp
from src.render_cards import main_render
#from src.render_cards import return_cards
from src.pokemon_content.pokemon_elements import PokemonElements, get_resist, get_weakness
from src.pokemon_content.pokemon_rarity import PokemonRarity
from src.mechanics.ability import Ability
from src.mechanics.card import Card
from src.mechanics.element import Element



app = Flask(__name__)
CORS(app)

# Set the JSON configuration to ensure non-ASCII characters are handled correctly (Japnanese)
app.config['JSON_AS_ASCII'] = False
#

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
    return "This is the generate API from the card_gen 頑張って！"

@app.route("/members", methods=['GET', 'POST'])
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

# Generate API route 
@app.route('/generate', methods=['GET'])
def generate():
    ## TAKE IN THE ARGS
    element = request.args.get("element", default="", type=str)
    subject = request.args.get("subject", default="", type=str)
    ## 🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵
    japanese = request.args.get("japanese", default="", type=str)
    ## 🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵
    number_of_monsters = 1


    ## 🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵
    if japanese == 'true':
        print(f"JAPANESE 🇯🇵")
        returnData = main_generate_jp(number_of_monsters, element, subject)
    else:
        print(f"ENGLISH 🇺🇸")
        returnData  = main_generate(number_of_monsters, element, subject)
    ## 🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵🇺🇸🇯🇵

    ## CALL THE SCRIPT AND RETURN THE JSON TO SAVE THE STATE
    ##returnData = main_generate(number_of_monsters, element, subject)

    ##👽👽👽👽##Test to see the JSON data👽👽👽👽
    print(jsonify({"data":returnData}))
    return jsonify({"data":returnData}),200, {'Content-Type': 'application/json; charset=utf-8'}

# render API route
@app.route('/render', methods=['POST'])
def render():
    print("👾👾👾STEP1: accessing render endpoint")
    #now it's all working
    json_string = request.form.get('json')  # Retrieve the JSON data from the form
    photo = request.files['photo']  # Retrieve the photo file from the form

    #### THIS IS AN ARRAY OF OBJECTS
    json_data = json.loads(json_string)

    ##SETUP ENCODED IMAGE RETURN
    encoded_images = []

    ### files and JSON extracted now need to pass to the func
    print('STEP 3: checking if the correct args are being passed to main_render')
    PIL_image = main_render(json_data, photo)

    print(PIL_image)
    #WORKING

    ## RETURN PIL WHICH WILL GET SENT TO BUFFER
    buffer = io.BytesIO()

    PIL_image.save(buffer, format="PNG")
    buffer.seek(0)
    image_data = buffer.read()

    ##CONVERT TO B64 to render in the front end
    encoded_image = base64.b64encode(image_data).decode('utf-8')
    encoded_images.append(encoded_image)

    # encoded_images.append(first_image_string.decode('utf-8'))
    #return jsonify({"response":encoded_images})

    return jsonify({"response": encoded_images})

# # Fetching pokemon image prompts
# @app.route('/prompts')
# def prompts():
#     folder_path = './output/pokemon-classic/cards'
#     file_contents = []
#     for filename in os.listdir(folder_path):
#         filepath = f"./output/pokemon-classic/cards/{filename}"
#         with open(filepath, "r") as file:
#             # contents = file.read()
#             contents = json.load(file)
#         # print (contents)
#         # "image_file": "001_armorgon.png"
#         ##print(contents["image_file"]) send back to rename file
#         file_contents.append({"Name":contents['name'], "Prompt":contents['image_prompt'], "Image_file":contents['image_file']})
#     return jsonify({"response":file_contents})
#     # return file_contents

# @app.route('/upload', methods=['POST'])
# def upload():
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#     print("🏆","upload success")
#     return jsonify({"response": request.form})

# @app.route('/photos')
# def photos():
#     ##print("we only want one card to render by passing this endpoint a state with the photo name saved from the first part")
#     # Path to our photos
#     folder_path = './output/pokemon-classic/renders'
#     if not os.path.isdir(folder_path):
#         return jsonify({'error': 'Invalid path provided'}),400
#     # Encoded image array
#     encoded_images = []

#     for filename in os.listdir(folder_path):
#         with open(os.path.join(folder_path, filename), 'rb') as image_file:
#                 # read the image data
#             # print("😡This is the file without processing from read")
#             # print(image_file)
#             image_data = image_file.read()
#                 # encode the image data as Base64
#             encoded_image = base64.b64encode(image_data).decode('utf-8')
#                 # append the encoded image to the list of encoded images
#             encoded_images.append(encoded_image)

#     return jsonify({"response":encoded_images})


if __name__ == "__main__":
    app.run(debug=True)