import sqlite3
from flask import Flask, request
import uuid

app = Flask(__name__)
db_conn = sqlite3.connect("./database.sqlite3", check_same_thread=False)


def init_db():
    cur = db_conn.cursor()
    cur.execute(
        "create table if not exists notepads(uuid text primary key, encrypted blob)")
    cur.close()


init_db()


@app.route("/api/hello-world")
def hello_world():
    return {"msg": "hello world"}


@app.route("/api/get-notepad", methods=['POST'])
def get_notepad():
    notepad_uuid = request.json['uuid']
    cur = db_conn.cursor()
    row = cur.execute("select encrypted from notepads where uuid = ?",
                      [notepad_uuid]).fetchall()
    cur.close()
    if len(row) == 1:
        return {"encrypted": row[0][0]}
    else:
        return {"msg": "not found"}


@app.route("/api/new-notepad", methods=['POST'])
def new_notepad():
    id = str(uuid.uuid4())
    cur = db_conn.cursor()
    cur.execute("insert into notepads values (?, '')", [id])
    return {"uuid": id}


@app.route("/api/save-notepad", methods=['POST'])
def save_notepad():
    uuid = request.json['uuid']
    encrypted = request.json['encrypted']
    cur = db_conn.cursor()
    cur.execute("update notepads set encrypted = ? where uuid = ?",
                [encrypted, uuid])
    return {"msg": "ok"}
