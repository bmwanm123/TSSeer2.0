# from flask import Flask, render_template

# app=Flask(__name__)

# @app.route('/')
# def hello_world():

#   return render_template("index.html")

# if __name__=='__main__':
#   app.run(debug=True)

import json
import mimetypes
import os

mimetypes.add_type("application/javascript", ".js", True)

from flask import Flask, jsonify, render_template, request

from TSSeerSystem import app


@app.route('/')
def index():
    #print(data.personal_ability) # TODO

    return render_template('index.html')
