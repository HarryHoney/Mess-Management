import cv2
import os
import sys

l = sys.argv
roll_number = l[1]
cap=cv2.VideoCapture(0)   
count = 0
os.mkdir('/home/harpreet/Desktop/FaceRecognition/trainingImages/'+roll_number)
path='/home/harpreet/Desktop/FaceRecognition/trainingImages/'+roll_number
while count<=200:
    ret,test_img=cap.read()
    if not ret :
        continue
    cv2.imwrite(os.path.join(path , "frame%d.jpg" % count), test_img)     # save frame as JPG file
    count += 1
    resized_img = cv2.resize(test_img, (1000, 700))
    cv2.imshow('face detection Tutorial ',resized_img)
    if cv2.waitKey(10) == ord('q') or count>200:                          #wait until 'q' key is pressed
        break

cap.release()
cv2.destroyAllWindows