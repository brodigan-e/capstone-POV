import sys

from PIL import Image

size = 35, 35
angular_segments_count = 120
angular_segments = 360 / angular_segments_count


def process_image_for_mcu(image_file):
    image = Image.open(image_file)
    image.thumbnail(size)

    output_pixels = [[]] * size[0]

    for theta in range(angular_segments_count):
        copied_image = image.copy()
        copied_image.rotate((360/angular_segments_count) * theta)
        pixels = list(copied_image.getdata())[35 * (17):35 * 17 + 35]
        for i in range(len(pixels)):
            output_pixels[i].append(pixels[i])

    return output_pixels


def print_pixels_as_mcu_code(rgb_data):
    print('.ledValues = {\n')
    for row in rgb_data:
        crgbSrings = list(map(lambda pixel: f"CRGB({pixel[0]},{pixel[1]},{pixel[2]})", row))
        print(f"{{ {','.join(crgbSrings)} }},")
    print('}')


if __name__ == '__main__':
    thePixels = process_image_for_mcu(sys.argv[1])
    print_pixels_as_mcu_code(thePixels)
