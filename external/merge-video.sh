ffmpeg -i video_$1.mp4 -i audio_$1.mp4 -c:v copy -c:a aac -strict experimental $1.mp4