from flask import Flask
import subprocess

app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

@app.route('/generate')
def generate():
    subprocess.call(['python', '../flask-server/pokemon-card-generator/src/generate.py'])
    return 'Script executed successfully!'

@app.route('/render')
def render():
    subprocess.call(['python', '../flask-server/pokemon-card-generator/src/render_cards.py'])
    return 'Script executed successfully!'

if __name__ == "__main__":
    app.run(debug=True)