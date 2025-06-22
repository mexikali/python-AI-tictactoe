from flask import *
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

@app.route('/', methods=['GET'])
def main():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()