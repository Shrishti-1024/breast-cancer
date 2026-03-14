# server/train_breast_model.py

import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from sklearn.utils.class_weight import compute_class_weight

# ---------------- CONFIG ----------------
# Run this from: D:\breast-cancer\server  (very important)

DATASET_DIR = "dataset"     # server/dataset/{benign,malignant,normal}
IMG_SIZE = (224, 224)
BATCH_SIZE = 16

INITIAL_EPOCHS = 10         # phase 1: top layers only
FINE_TUNE_EPOCHS = 20       # phase 2: unfreezing + fine-tuning (max)
TOTAL_EPOCHS = INITIAL_EPOCHS + FINE_TUNE_EPOCHS

# ---------------- DATA ----------------

datagen = ImageDataGenerator(
    rescale=1.0 / 255.0,
    validation_split=0.2,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.15,
    horizontal_flip=True,
    fill_mode="nearest",
)

train_gen = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="training",
)

val_gen = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="validation",
)

print("\nClass indices:", train_gen.class_indices)

# --------- CLASS WEIGHTS (handle class imbalance) ---------

classes = train_gen.classes  # har image ka class index
class_labels = np.unique(classes)

class_weights_array = compute_class_weight(
    class_weight="balanced",
    classes=class_labels,
    y=classes,
)

class_weights = dict(zip(class_labels, class_weights_array))
print("Class weights:", class_weights)

num_classes = train_gen.num_classes

# ---------------- MODEL ----------------

base_model = EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3),
)

# Phase 1: base_model freeze
base_model.trainable = False

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
outputs = Dense(num_classes, activation="softmax")(x)

model = Model(inputs=base_model.input, outputs=outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss="categorical_crossentropy",
    metrics=["accuracy"],
)

checkpoint_path = "model/breast_cancer_model.h5"
os.makedirs("model", exist_ok=True)

early_stop = EarlyStopping(
    monitor="val_loss",
    patience=5,
    restore_best_weights=True,
    verbose=1,
)

reduce_lr = ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.2,
    patience=3,
    min_lr=1e-6,
    verbose=1,
)

checkpoint = ModelCheckpoint(
    checkpoint_path,
    monitor="val_loss",
    save_best_only=True,
    verbose=1,
)

print("\n-------- PHASE 1: Train top layers only --------")

history_1 = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=INITIAL_EPOCHS,
    class_weight=class_weights,
    callbacks=[early_stop, reduce_lr, checkpoint],
)

# ---------------- FINE-TUNING ----------------

print("\n-------- PHASE 2: Fine-tune base model --------")

# unfreeze last ~30% layers of base_model
fine_tune_at = int(len(base_model.layers) * 0.7)

for i, layer in enumerate(base_model.layers):
    layer.trainable = i >= fine_tune_at

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="categorical_crossentropy",
    metrics=["accuracy"],
)

history_2 = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=TOTAL_EPOCHS,
    initial_epoch=history_1.epoch[-1] + 1,
    class_weight=class_weights,
    callbacks=[early_stop, reduce_lr, checkpoint],
)

print("\n✅ Training finished.")
print(f"📁 Best model saved at: {checkpoint_path}")
print("Final class indices:", train_gen.class_indices)

# Optional: evaluate final model on val set
val_loss, val_acc = model.evaluate(val_gen)
print(f"\n📊 Final validation accuracy: {val_acc:.4f}, loss: {val_loss:.4f}")
