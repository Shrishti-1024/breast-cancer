from tensorflow.keras.preprocessing.image import ImageDataGenerator

IMG_SIZE = (224, 224)

datagen = ImageDataGenerator(rescale=1./255)

gen = datagen.flow_from_directory(
    "dataset",              # <-- apne dataset ka root path daalo
    target_size=IMG_SIZE,
    batch_size=32,
    class_mode="categorical"
)

print(gen.class_indices)
