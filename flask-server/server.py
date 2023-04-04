from flask import Flask

app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2"]}

if __name__ == "__main__":
    app.run(debug=True)