import pandas as pd
from catboost import CatBoostRegressor  # (ou CatBoostClassifier pour la classification)
model = CatBoostRegressor()
model.load_model('C:/Users/MSI/OneDrive/Desktop/2 ING/Semestre 2/tp web/modele.cb')
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les routes de l'application

@app.route('/predictions', methods=['POST'])
def make_predictions():
    data = request.json  # Les données d'entrée doivent être envoyées au format JSON
    new_data = pd.DataFrame(data)
    new_data['DATOP'] = pd.to_datetime(new_data['DATOP'])
    new_data['STD'] = pd.to_datetime(new_data['STD'])
    new_data['STA'] = pd.to_datetime(new_data['STA'])
    predictions = model.predict(new_data)
    response = {'predictions': predictions.tolist()}
    return jsonify(response)

if __name__ == '__main__':
    app.run()
