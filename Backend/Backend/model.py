import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns
import requests

api_key = "644499f581c7474c88322946243108"
city = "vadodara"
api_url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no"

response = requests.get(api_url)

if response.status_code == 200:
    data = response.json()

    print("API Response:", data)

    try:
        temperature = data['current']['temp_c']  
        humidity = data['current']['humidity']
        rainfall = data['current'].get('precip_mm', 0)  
        wind_speed = data['current'].get('wind_kph', 0)  
    except KeyError as e:
        print(f"Error: Missing key {e} in the API response.")
        temperature = humidity = rainfall = wind_speed = None

    if temperature is not None and humidity is not None and rainfall is not None:
        data_dict = {
            'temperature': [temperature],
            'humidity': [humidity],
            'rainfall': [rainfall],
            'wind_speed': [wind_speed]
        }
        data = pd.DataFrame(data_dict)

        print(data.head())

        rainfall_threshold_for_flood = 100  
        rainfall_threshold_for_landslide = 150  
        temperature_threshold_for_heat_wave = 40  
        wind_speed_threshold_for_cyclone = 100  

        data['flood_occurrence'] = (data['rainfall'] > rainfall_threshold_for_flood).astype(int)
        data['landslide_occurrence'] = (data['rainfall'] > rainfall_threshold_for_landslide).astype(int)
        data['heat_wave_occurrence'] = (data['temperature'] > temperature_threshold_for_heat_wave).astype(int)
        data['cyclone_occurrence'] = (data['wind_speed'] > wind_speed_threshold_for_cyclone).astype(int)

        features = ['rainfall', 'temperature', 'humidity', 'wind_speed']

        def train_and_predict(event, features, data):
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            model.fit(data[features], data[event])
            data[f'predicted_{event}'] = model.predict(data[features])
            accuracy = accuracy_score(data[event], data[f'predicted_{event}'])
            print(f"{event.replace('_', ' ').title()} Prediction Accuracy: {accuracy:.2f}")
            print(f"{event.replace('_', ' ').title()} Classification Report:")
            print(classification_report(data[event], data[f'predicted_{event}']))
            return model

        flood_model = train_and_predict('flood_occurrence', features, data)
        landslide_model = train_and_predict('landslide_occurrence', features, data)
        heat_wave_model = train_and_predict('heat_wave_occurrence', features, data)
        cyclone_model = train_and_predict('cyclone_occurrence', features, data)

        print(data[['rainfall', 'temperature', 'humidity', 'wind_speed', 'flood_occurrence', 'predicted_flood_occurrence',
                    'landslide_occurrence', 'predicted_landslide_occurrence',
                    'heat_wave_occurrence', 'predicted_heat_wave_occurrence',
                    'cyclone_occurrence', 'predicted_cyclone_occurrence']])

        def plot_feature_importance(model, features, event_name):
            feature_importances = model.feature_importances_
            sorted_idx = feature_importances.argsort()
            plt.figure(figsize=(10, 6))
            plt.barh(range(len(sorted_idx)), feature_importances[sorted_idx], align='center')
            plt.yticks(range(len(sorted_idx)), [features[i] for i in sorted_idx])
            plt.xlabel('Feature Importance')
            plt.title(f'Feature Importances in {event_name} Prediction Model')
            plt.show()

        plot_feature_importance(flood_model, features, "Flood")
        plot_feature_importance(landslide_model, features, "Landslide")
        plot_feature_importance(heat_wave_model, features, "Heat Wave")
        plot_feature_importance(cyclone_model, features, "Cyclone")

    else:
        print("Error: Could not retrieve weather data properly.")
else:
    print(f"Error: Failed to fetch data from the API. Status code: {response.status_code}")