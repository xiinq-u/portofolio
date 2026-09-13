"""Build browser-ready MP4s from the original 60 fps image sequences.
Run with: python scripts/build-animation-videos.py --ffmpeg path/to/ffmpeg
"""
import argparse
import pathlib
import subprocess
import tempfile

parser = argparse.ArgumentParser()
parser.add_argument('--ffmpeg', default='ffmpeg')
args = parser.parse_args()
root = pathlib.Path(__file__).resolve().parents[1]
out = root / 'public/videos'
out.mkdir(exist_ok=True)

def encode(folder, start, count, output):
    subprocess.run([args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
        '-framerate', '60', '-start_number', str(start), '-i',
        str(root / 'public/images' / folder / 'frame_%06d.jpg'),
        '-t', str(count / 60), '-vf', 'fps=30,scale=1920:-2:force_original_aspect_ratio=decrease',
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-pix_fmt', 'yuv420p',
        '-an', '-movflags', '+faststart', str(output)], check=True)

with tempfile.TemporaryDirectory() as temp:
    temp = pathlib.Path(temp)
    for index, folder in enumerate(['idle', 'waving', 'finger heart']):
        print(f'Encoding {folder}', flush=True)
        encode(folder, 1, 600, temp / f'{index}.mp4')
    (temp / 'concat.txt').write_text("file '0.mp4'\nfile '1.mp4'\nfile '2.mp4'\n")
    subprocess.run([args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
        '-f', 'concat', '-safe', '0', '-i', str(temp / 'concat.txt'),
        '-c', 'copy', '-movflags', '+faststart', str(out / 'hero.mp4')], check=True)
print('Encoding loading', flush=True)
encode('loading_Screen', 15, 179, out / 'loading.mp4')
for name, folder, frame in [('hero', 'idle', 1), ('loading', 'loading_Screen', 15)]:
    import shutil
    shutil.copyfile(root / 'public/images' / folder / f'frame_{frame:06d}.jpg', out / f'{name}-poster.jpg')
for file in out.iterdir():
    print(file.name, file.stat().st_size, flush=True)
