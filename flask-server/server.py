from flask import Flask, request, jsonify, send_file
import subprocess
import asyncio
import os
import json

app = Flask(__name__)

### async script runner

async def run_script(script_path):
    await subprocess.call(['python', script_path])
    return('Script executed successfully!')

###

# Members API Route

@app.route("/members", methods=['GET', 'POST'])
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

# Generate API route 
@app.route('/generate', methods=['GET'])
def generate():
    element = request.args.get("element", default="", type=str)
    subject = request.args.get("subject", default="", type=str)
    returnData = subprocess.call(['python', '../flask-server/pokemon-card-generator/src/generate.py', '-e', element ,'--subject', subject])
    #print(element, subject)
    #return 'Script executed successfully!', 200
    return jsonify({"data":returnData})

# render API route
@app.route('/render')
def render():
    subprocess.call(['python', '../flask-server/pokemon-card-generator/src/render_cards.py'])
    return 'Script executed successfully!'

# Fetching pokemon image prompts
@app.route('/prompts')
def prompts():
    folder_path = '../flask-server/pokemon-card-generator/output/pokemon-classic/cards'
    file_contents = []
    for filename in os.listdir(folder_path):
        filepath = f"./pokemon-card-generator/output/pokemon-classic/cards/{filename}"
        with open(filepath, "r") as file:
            # contents = file.read()
            contents = json.load(file)
        print (contents)
        file_contents.append({"Name":contents['name'], "Prompt":contents['image_prompt']})
    return jsonify({"response":file_contents})
    # return file_contents

@app.route('/upload', methods=['POST'])
def upload():

    #print (request.files)
    files = request.files
    file = files.get('file')

    print (file)
    return jsonify({"response": request.form})

@app.route('/photos')
def photos():
    folder_path = '../flask-server/pokemon-card-generator/gallery/renders'
    if not os.path.isdir(folder_path):
        return jsonify({'error': 'Invalid path provided'}),400
    
    files = os.listdir(folder_path)
    photos = [file for file in files]
    #print(files[0])
    #return photos.body

    res = os.getcwd()
    # res = response.body

    return jsonify({"response":files})


if __name__ == "__main__":
    app.run(debug=True)