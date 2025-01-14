import os
import warnings
import pandas as pd
import pickle as pkl
from flask import Flask 
from flask import json, request
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import KNeighborsClassifier
warnings.filterwarnings("ignore")

app = Flask(__name__)
path = os.path.join("models")

scaler = None
with open(os.path.join(path, "scaler.pkl"), "rb") as f:
    scaler = pkl.load(f)

model = None
with open(os.path.join(path, "model.pkl"), "rb") as f:
    model = pkl.load(f)

columns = [
    "usia",
    "jenis_kelamin",
    "uang_bulanan",
    "ekonomi_mendukung",
    "penghasilan_cukup",
    "tujuan_jangka_panjang",
    "penghasilan_tambahan",
    "meningkatkan_kekayaan",
    "literasi_keuangan",
    "kemudahan_platform",
    "keuntungan",
    "risiko",
    "tahu_investasi",
    "sudah_investasi",
]

gender_mapper = {
    "male": 0,
    "female": 1,
}

boolean_mapper = {
    "no": 0,
    "maybe": 1,
    "yes": 2,
}

@app.route("/api/_healthcheck")
def healthcheck():
    return "OK"

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()

    df = pd.DataFrame(data=data, index=[0])
    df = df.reindex(columns=columns)

    df["jenis_kelamin"] = df["jenis_kelamin"].replace(gender_mapper)
    df["tahu_investasi"] = df["tahu_investasi"].replace(boolean_mapper)
    df["sudah_investasi"] = df["sudah_investasi"].replace(boolean_mapper)

    for col in df.columns:
        df[col] = df[col].apply(pd.to_numeric, errors="ignore")

    df["uang_bulanan"] = scaler.transform(df["uang_bulanan"].values.reshape(-1, 1))
    df = df.drop(["keuntungan", "jenis_kelamin"], axis=1)
    
    pred = model.predict(df)
    index = pred[0]

    prediction = {
        0: "no",
        1: "yes",
        2: "maybe",
    }

    response = app.response_class(
        status=200,
        response=json.dumps({
            "input": data,
            "result": prediction[index],
        }),
        mimetype='application/json'
    )

    
    return response