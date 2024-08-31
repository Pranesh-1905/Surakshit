from flask import Flask, request, jsonify
import mysql.connector
import requests

app = Flask(__name__)

db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'pranu1905',
    'database': 'disaster_server'
}

api_key = '644499f581c7474c88322946243108'

def db_connection():
    return mysql.connector.connect(**db_config)

def fetch_weather_data(city):
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def check_calamity_alerts(weather_data):
    if weather_data:
        temperature = weather_data['current']['temp_c']
        humidity = weather_data['current']['humidity']
        wind_speed = weather_data['current']['wind_kph']
        rainfall = weather_data.get('precip_mm', 0)

        if wind_speed > 60 and rainfall > 50:
            return "Cyclone alert! Strong winds and heavy rainfall expected."
        if rainfall > 100 and temperature > 25 and humidity > 70:
            return "Landslide alert! Heavy rainfall expected. Be cautious in hilly or mountainous areas."
        if rainfall > 150 and humidity > 80:
            return "Flood alert! Excessive rainfall and high humidity causing flooding."
        if temperature > 40 and humidity > 50:
            return "Heatwave alert! Extreme heat and humidity conditions."
        return "No immediate calamity threat."
    else:
        return "Unable to fetch weather data. Please try again later."

def get_nearest_relief_centers(user_city):
    db = db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT Centre_ID, Centre_Name, City, Address FROM relief_centre WHERE City = %s", (user_city,))
    relief_centers = cursor.fetchall()
    db.close()
    return relief_centers

def get_user_city(mobile_number):
    db = db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT City FROM user_data WHERE Mobile_no = %s", (mobile_number,))
    result = cursor.fetchone()
    db.close()
    return result[0] if result else None

@app.route('/register', methods=['POST'])
def register_user():
    try:
        db = db_connection()
        cursor = db.cursor()
        cursor.execute("INSERT INTO user_data (Name, Mobile_no, Password, State, District, City, Ward) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (request.json['Name'], request.json['Mobile_no'], request.json['Password'], request.json['State'], request.json['District'], request.json['City'], request.json['Ward']))
        db.commit()
        db.close()
        return jsonify({'message': 'User registered successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/login', methods=['POST'])
def login_user():
    try:
        db = db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM user_data WHERE Mobile_no = %s AND Password = %s", 
                       (request.json['Mobile_no'], request.json['Password']))
        result = cursor.fetchone()
        db.close()
        if result:
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Invalid credentials'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    try:
        mobile_number = request.args.get('Mobile_no')
        db = db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM user_data WHERE Mobile_no = %s", (mobile_number,))
        user_info = cursor.fetchone()
        db.close()
        if user_info:
            return jsonify({'user_info': user_info})
        else:
            return jsonify({'message': 'User not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/get_relief_centers', methods=['GET'])
def get_relief_centers():
    try:
        mobile_number = request.args.get('Mobile_no')
        user_city = get_user_city(mobile_number)
        if user_city:
            relief_centers = get_nearest_relief_centers(user_city)
            return jsonify({'relief_centers': relief_centers})
        else:
            return jsonify({'message': 'User city not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/get_weather_data', methods=['GET'])
def get_weather_data():
    try:
        mobile_number = request.args.get('Mobile_no')
        user_city = get_user_city(mobile_number)
        if user_city:
            weather_data = fetch_weather_data(user_city)
            calamity_alert = check_calamity_alerts(weather_data)
            return jsonify({'weather_data': weather_data, 'calamity_alert': calamity_alert})
        else:
            return jsonify({'message': 'User city not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
