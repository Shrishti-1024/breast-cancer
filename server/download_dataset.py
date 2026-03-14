import kagglehub

# Download dataset from Kaggle
path = kagglehub.dataset_download("sabahesaraki/breast-ultrasound-images-dataset")

# Print the download location
print("Dataset downloaded to:", path)
