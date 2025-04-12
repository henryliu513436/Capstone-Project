# Golf Trajectory Estimation System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.6+-blue.svg)](https://www.python.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.5+-green.svg)](https://opencv.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://www.javascript.com/)

## 📝 Description

The Golf Trajectory Estimation System is an indoor golf simulation solution that uses high-speed cameras and computer vision techniques to track golf ball trajectories without requiring an actual golf course. The system captures the initial ball parameters (velocity, launch angle, and side angle) immediately after impact and computes the expected trajectory, creating an immersive indoor golfing experience.

**Project Demo Video:** [Watch the full demonstration](https://www.youtube.com/watch?v=5HfurnFYy0I)

This project was developed as a capstone project at National Taipei University of Technology's Department of Electronic Engineering between October 2021 and May 2022.

## 🌟 Key Features

- **Real-time Ball Detection**: Utilizes high-speed cameras and advanced image processing techniques to detect and track golf balls in motion
- **Accurate Trajectory Estimation**: Calculates ball trajectory using physics-based models that incorporate air resistance
- **Dual-Camera Synchronization**: Uses two synchronized cameras (side and top view) for precise 3D path estimation
- **GPU-Accelerated Processing**: Implements CUDA for significantly faster image processing (3.5x performance boost)
- **Interactive Web Interface**: Provides live trajectory visualization and historical shot data
- **Database Integration**: Stores and retrieves user shot history

## 🔍 System Architecture

The system consists of four main components:

1. **Synchronized Dual-Camera Input**: Captures the golf ball from two different angles
2. **Moving Object Detection & Coordinate Acquisition**: Processes images to identify and track the golf ball
3. **Trajectory Prediction Algorithm**: Calculates the ball's flight path using physics models
4. **Web Interface**: Displays prediction results to the user

## 🧪 Technical Implementation

### Image Processing Pipeline

- **Background Subtraction**: Uses MOG2 (Gaussian Mixture-based background segmentation) algorithm to isolate moving objects
- **Morphological Operations**: Applies erosion and dilation to reduce noise and improve detection
- **Contrast Enhancement**: Implements CLAHE (Contrast Limited Adaptive Histogram Equalization) to improve ball recognition
- **Circle Detection**: Utilizes Hough Transform to identify circular objects matching the golf ball's expected size

### Physics Model

- Implements projectile motion equations with air resistance
- Calculates:
  - Initial velocity
  - Launch angle
  - Side angle (directional deviation)
- Uses polynomial regression to fit ball position data and determine initial conditions
- Models air resistance using drag coefficient of 0.42 for solid spheres

### Performance Optimization

- GPU acceleration using CUDA
- Image downscaling with bilinear interpolation
- Grayscale conversion to reduce processing data
- Multi-threading for camera synchronization

### Web Interface

- Front-end built with Three.js for 3D visualization
- Real-time data updates using JavaScript Fetch API
- User authentication for personalized shot history
- Backend server implemented with Node.js and Express
- MySQL database for data persistence

## 📊 Results

The system successfully:
- Detects and tracks golf balls in real-time
- Calculates trajectory parameters (initial velocity, launch angle, side angle)
- Provides accurate landing point predictions
- Renders realistic 3D visualization of ball flight
- Stores shot history for future reference

## 💻 Technologies Used

- **Programming Languages**: Python, JavaScript, HTML/CSS
- **Computer Vision**: OpenCV, CUDA
- **Physics Modeling**: NumPy, Mathematical modeling
- **Web Development**: Node.js, Express, Three.js
- **Database**: MySQL
- **Hardware**: High-speed cameras (UI-3040CP-C-HQ-R2)

## 📋 Usage

1. Set up the cameras in the recommended positions:
   - One camera positioned to the side of the player
   - One camera positioned above the tee area

2. Launch the application and ensure both cameras are properly synchronized

3. Take a shot with your golf club and watch as the system:
   - Detects the ball
   - Calculates the trajectory
   - Visualizes the flight path
   - Records the shot in your history

4. Review previous shots through the shot history feature

## 🚀 Future Improvements

- Enhanced physics model with spin detection
- Wind simulation
- Multiple terrain types
- Club type recognition
- Mobile application integration
- Multiplayer functionality


## 🙏 Acknowledgements

This project was supervised by Associate Professor Kao Li-Ren.

## 📚 References

1. NVIDIA CUDA Technology - [NVIDIA CUDA](https://www.computerdiy.com.tw/nvidia-cuda/)
2. Fetch API - [MDN Web Docs](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
3. Circle Hough Transform - [Wikipedia](https://en.wikipedia.org/wiki/Circle_Hough_Transform)
4. Efficient adaptive density estimation per image pixel for background subtraction

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ If you find this project useful, please consider giving it a star on GitHub! ⭐
