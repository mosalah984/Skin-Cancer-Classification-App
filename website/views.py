from flask import Blueprint,render_template ,request,jsonify,redirect,url_for,flash,current_app
from flask_login import login_required, current_user
from datetime import date
from werkzeug.security import generate_password_hash, check_password_hash
from . import db 
from .models import User,File
from werkzeug.utils import secure_filename
import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

model = load_model(r"E:\GP\Model Results\DensNet201\densnet201.h5")

class_labels  = ['Actinic keratoses', 'Basal Cell Carcinoma', ' Benign keratosis',
                 ' Dermatofibroma ', 'Melanoma ', 'Melanocytic Nevi', 'Vascular Lesions']


def preprocessing(image_path, k=90):
    # Load the image and resize it to 224x224
    image = Image.open(image_path)
    image = image.resize((224, 224))

    # Convert the image to RGB format
    image = image.convert("RGB")

    # Split the image into R, G, B channels
    r, g, b = image.split()

    # Convert the channels to NumPy arrays
    r_array = np.array(r)
    g_array = np.array(g)
    b_array = np.array(b)

    # Perform SVD on each channel
    Ur, Sr, Vr = np.linalg.svd(r_array, full_matrices=False)
    Ug, Sg, Vg = np.linalg.svd(g_array, full_matrices=False)
    Ub, Sb, Vb = np.linalg.svd(b_array, full_matrices=False)

    # Reduce the dimensions of each channel using the given k value
    r_approx = (Ur[:, :k] * Sr[:k]).dot(Vr[:k, :])
    g_approx = (Ug[:, :k] * Sg[:k]).dot(Vg[:k, :])
    b_approx = (Ub[:, :k] * Sb[:k]).dot(Vb[:k, :])

    # Create new image arrays with the reduced dimensions
    r_image = Image.fromarray(np.clip(r_approx, 0, 255).astype(np.uint8))
    g_image = Image.fromarray(np.clip(g_approx, 0, 255).astype(np.uint8))
    b_image = Image.fromarray(np.clip(b_approx, 0, 255).astype(np.uint8))

    # Merge the channels back into a single image
    compressed_image = Image.merge("RGB", (r_image, g_image, b_image))

    # Convert the image to a NumPy array
    x = np.array(compressed_image)

    # Preprocess the image
    x = tf.cast(x, tf.float32)
    x = x / 127.5 - 1

    # Add a batch dimension to the image
    x = tf.expand_dims(x, axis=0)

    return x

views = Blueprint('views',__name__)

@views.route('/')
def home():
    return render_template('home.html')

@views.route('/profile')
@login_required
def profile():
    user = current_user
    dob = current_user.dob
    today = date.today()
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    return render_template('profile.html',age=age,user=user)

            
@views.route('/edit_profile', methods=['POST'])
@login_required
def edit_profile():
    if request.method == 'POST':
        name = request.form.get('name')

        user = User.query.filter_by(id=current_user.id).first()
        flag = False
        if name:
            flag = True
            user.name = name
        if flag:
            db.session.commit()
            flash('Your profile has been updated!', 'success')
            return redirect(url_for('views.profile'))
        
    return redirect(url_for('views.profile'))


@views.route('/edit_pass', methods=['POST'])
@login_required
def edit_pass():
    if request.method == 'POST':
        old_password = request.form.get('password')
        new_password = request.form.get('newPassword')
        print(old_password)
        user = User.query.filter_by(id=current_user.id).first()
        flag =False
        if check_password_hash(user.password, old_password):
            if new_password:
                flag = True
                user.password = generate_password_hash(new_password, method='sha256')  
        else:
            flash('Incorrect password, try again.', category='error')

        if flag:
             db.session.commit()
             flash('Your password has been updated!', 'success')

        return redirect(url_for('views.profile'))
            

@views.route('/upload', methods=['POST','GET'])
def upload():
    if request.method == 'POST':
        file = request.files['inputImg']
        filename = secure_filename(file.filename)
        print(filename)
        mimetype = file.mimetype
        path = os.path.join(os.path.abspath(os.path.dirname(__file__)),current_app.config['UPLOAD_FOLDER'],secure_filename(file.filename))
        print(path)

        file.save(path)

        x = preprocessing(file)
        result = model.predict(x,verbose=0)
        prediction = class_labels[np.argmax(result)]
        print(prediction)

        if current_user.is_authenticated:
            # Create new Image object and add to session
            new_history = File(name=filename,mimetype=mimetype ,path=path,prediction=prediction, user_id=current_user.id)
            db.session.add(new_history)
            db.session.commit()


        print(prediction)
        return jsonify({'prediction': prediction})
    else:
        return render_template('upload.html')
    

@views.route('/history')
@login_required
def history():
    images = File.query.filter_by(user_id=current_user.id).all()
    return render_template('history.html', images=images)


@views.route('/predictApi', methods=['POST'])
def predict_api():
    try:
        if 'imgFile' not in request.files:
            return jsonify({'Error': 'No photo uploaded.'})

        img_file = request.files.get('imgFile')
        x = preprocessing(img_file)
        result = model.predict(x, verbose=0)
        prediction = class_labels[np.argmax(result)]

        return jsonify({'Prediction': prediction})

    except Exception as e:
        views.logger.error(str(e))
        return jsonify({'Error': 'Something went wrong. Please try again.'})




