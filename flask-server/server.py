from flask import Flask
import subprocess

app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

@app.route('/run_script')
def run_script():
    subprocess.call(['python', '../flask-server/pokemon-card-generator/src/generate.py'])
    return 'Script executed successfully!'

if __name__ == "__main__":
    app.run(debug=True)