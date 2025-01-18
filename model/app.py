import streamlit as st
import pandas as pd
import os
import pickle

# Streamlit app

# Check if the model.pkl file exists
model_file_path = 'model.pkl'
if os.path.exists(model_file_path):
    with open(model_file_path, 'rb') as file:
        model = pickle.load(file)
else:
    st.error('Model file not found! Please ensure model.pkl is present.')
    st.stop()

st.title('Reward Points Prediction')

# Input fields for user to provide data
part_name = st.selectbox('Part Name', ['EXTERIOR', 'INTERIOR'])  # Example options
material = st.selectbox('Material', [
    'cotton', 'viscose', 'fiber', 'elastane', 'polyester', 'linen', 
    'lyocell', 'polyamide', 'nylon', 'wool', 'acrylic', 'camel', 
    'cupro', 'modal'
])  # Example options
join_life = st.selectbox('Eco Friendly', [True, False])
item_price = st.number_input('Item Price')

# Prediction
if st.button('Predict Reward Points'):
    input_data = pd.DataFrame({
        'part_name': [part_name],
        'material': [material],
        'eco_friendly': [join_life],
        'item_price': [item_price]
    })
    reward_point = model.predict(input_data)[0]
    positive_reward_point = abs(reward_point)  # Ensure reward points are positive
    st.success(f'Predicted Reward Points: {positive_reward_point}')
