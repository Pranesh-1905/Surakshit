from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import requests

app = Flask(__name__)

# Placeholder for the model (we'll define it later)
flood_model = None
landslide_model = None
heat_wave_model = None
cyclone_model = None

# API key and URL for WeatherAPI
api_key = "644499f581c7474c88322946243108"

def load_models():
    global flood_model, landslide_model, heat_wave_model, cyclone_model

    # Simulate loading models (replace with actual training/loading if available)
    flood_model = RandomForestClassifier(n_estimators=100, random_state=42)
    landslide_model = RandomForestClassifier(n_estimators=100, random_state=42)
    heat_wave_model = RandomForestClassifier(n_estimators=100, random_state=42)
    cyclone_model = RandomForestClassifier(n_estimators=100, random_state=42)

@app.route('/predict_disaster', methods=['POST'])
def predict_disaster():
    data = request.json
    city = data.get('city')

    # Fetch weather data from the API
    api_url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no"
    response = requests.get(api_url)

    if response.status_code == 200:
        weather_data = response.json()

        try:
            temperature = weather_data['current']['temp_c']  # Temperature in Celsius
            humidity = weather_data['current']['humidity']
            rainfall = weather_data['current'].get('precip_mm', 0)  # Rainfall in millimeters
            wind_speed = weather_data['current'].get('wind_kph', 0)  # Wind speed in kph
        except KeyError as e:
            return jsonify({"error": f"Missing key {e} in the API response."}), 400

        # Create DataFrame for prediction
        input_data = pd.DataFrame({
            'temperature': [temperature],
            'humidity': [humidity],
            'rainfall': [rainfall],
            'wind_speed': [wind_speed]
        })

        # Perform predictions
        flood_prediction = flood_model.predict(input_data)[0]
        landslide_prediction = landslide_model.predict(input_data)[0]
        heat_wave_prediction = heat_wave_model.predict(input_data)[0]
        cyclone_prediction = cyclone_model.predict(input_data)[0]

        # Store predictions in separate variables
        is_flood = bool(flood_prediction)
        is_landslide = bool(landslide_prediction)
        is_heat_wave = bool(heat_wave_prediction)
        is_cyclone = bool(cyclone_prediction)

        # Determine the response message
        if not is_flood and not is_landslide and not is_heat_wave and not is_cyclone:
            response = "We are happy that you are safe and secured"
        else:
            calamity = ""
            if is_flood:
                calamity = "Flood"
            elif is_landslide:
                calamity = "Landslide"
            elif is_heat_wave:
                calamity = "Heatwave"
            elif is_cyclone:
                calamity = "Cyclone"
            response = f"Alert: {calamity} detected!"

        # Prepare the final response with the weather data and the alert message
        result = {
            'flood': is_flood,
            'landslide': is_landslide,
            'heat_wave': is_heat_wave,
            'cyclone': is_cyclone,
            'temperature': temperature,
            'humidity': humidity,
            'rainfall': rainfall,
            'wind_speed': wind_speed,
            'message': response
        }

        # Return the prediction result and message as JSON
        return jsonify(result)
    else:
        return jsonify({"error": f"Failed to fetch data from the API. Status code: {response.status_code}"}), 500


if __name__ == '__main__':
    load_models()
    app.run(debug=True)
